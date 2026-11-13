const {list,put} = require('@vercel/blob');
const {randomUUID} = require('node:crypto');
const validIds = new Set(require('../lib/progress-ids.json'));
const prefix = 'progress/v1/';

// Immutable event files prevent separate questions or concurrent writes from
// overwriting one another. The filename indexes state without downloading files.
async function readProgress() {
  const latest = new Map();
  let cursor;
  do {
    const page = await list({prefix,cursor,limit:1000});
    for (const blob of page.blobs) {
      const match = blob.pathname.slice(prefix.length).match(/^([^/]+)\/(0|1)-(\d+)-(0|1)-(\d+)-[^/]+\.json$/);
      if (!match || !validIds.has(match[1])) continue;
      const [,id,priority,order,done,time] = match;
      const rank = `${priority}-${order.padStart(16,'0')}-${blob.pathname}`;
      if (!latest.has(id) || rank > latest.get(id).rank) latest.set(id,{rank,done:done==='1',time:Number(time)});
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  const checked = {}, activity = {};
  for (const [id,event] of latest) {
    checked[id] = event.done;
    if (event.time) activity[id] = {[event.done ? 'doneAt' : 'undoneAt']:new Date(event.time).toISOString()};
  }
  return {checked,activity};
}
async function writeEvent(id,done,time,imported=false) {
  const path = `${prefix}${id}/${imported ? 0 : 1}-${time}-${done ? 1 : 0}-${time}-${randomUUID()}.json`;
  const at = time ? new Date(time).toISOString() : null;
  await put(path,JSON.stringify({id,done,at,imported}),{access:'private',addRandomSuffix:false,contentType:'application/json'});
  return {id,done,at};
}
module.exports = async function handler(req,res) {
  res.setHeader('Cache-Control','no-store');
  if (!['GET','POST'].includes(req.method)) return res.status(405).json({error:'Method not allowed'});
  try {
    if (req.method === 'GET') return res.status(200).json(await readProgress());
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!body || JSON.stringify(body).length > 80000) return res.status(400).json({error:'Invalid request'});
    if (body.action === 'import') {
      const saved = await readProgress();
      const entries = Object.entries(body.checked || {}).filter(([id,done])=>validIds.has(id) && typeof done === 'boolean' && !Object.hasOwn(saved.checked,id));
      // Bounded batches; imported records always rank below real server actions.
      for (let i=0;i<entries.length;i+=10) await Promise.all(entries.slice(i,i+10).map(([id,done])=>{
        const value=body.activity?.[id]?.[done ? 'doneAt' : 'undoneAt'];
        const parsed=typeof value === 'string' ? Date.parse(value) : NaN;
        const time=Number.isFinite(parsed) && parsed>0 && parsed<=Date.now() ? parsed : 0;
        return writeEvent(id,done,time,true);
      }));
      return res.status(200).json(await readProgress());
    }
    if (!validIds.has(body.id) || typeof body.done !== 'boolean') return res.status(400).json({error:'Invalid question or status'});
    return res.status(200).json(await writeEvent(body.id,body.done,Date.now()));
  } catch (error) {
    console.error('Progress storage failed',error.name);
    return res.status(503).json({error:'Progress could not be saved. Please retry.'});
  }
};
