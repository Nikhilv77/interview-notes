"use strict";

const expansionBatchData = [
  {
    "id": "arrays-hashing-prefix-sums",
    "title": "Arrays, Hashing, and Prefix Sums",
    "groups": [
      {
        "title": "Hash maps, frequency counts, and array indexing",
        "note": "Practice sets, frequency maps, grouping by a signature, and using bounded values as indices.",
        "questions": [
          [
            221,
            2215,
            "Find the Difference of Two Arrays",
            "https://leetcode.com/problems/find-the-difference-of-two-arrays/",
            "Easy"
          ],
          [
            222,
            205,
            "Isomorphic Strings",
            "https://leetcode.com/problems/isomorphic-strings/",
            "Easy"
          ],
          [
            223,
            49,
            "Group Anagrams",
            "https://leetcode.com/problems/group-anagrams/",
            "Medium"
          ],
          [
            224,
            36,
            "Valid Sudoku",
            "https://leetcode.com/problems/valid-sudoku/",
            "Medium"
          ],
          [
            225,
            454,
            "4Sum II",
            "https://leetcode.com/problems/4sum-ii/",
            "Medium"
          ],
          [
            226,
            274,
            "H-Index",
            "https://leetcode.com/problems/h-index/",
            "Medium"
          ],
          [
            227,
            442,
            "Find All Duplicates in an Array",
            "https://leetcode.com/problems/find-all-duplicates-in-an-array/",
            "Medium"
          ],
          [
            228,
            41,
            "First Missing Positive",
            "https://leetcode.com/problems/first-missing-positive/",
            "Hard"
          ]
        ]
      },
      {
        "title": "Running sums and range queries",
        "note": "Build a running total, subtract two prefixes, and extend that idea to rectangular queries.",
        "questions": [
          [
            229,
            303,
            "Range Sum Query - Immutable",
            "https://leetcode.com/problems/range-sum-query-immutable/",
            "Easy"
          ],
          [
            230,
            724,
            "Find Pivot Index",
            "https://leetcode.com/problems/find-pivot-index/",
            "Easy"
          ],
          [
            231,
            2256,
            "Minimum Average Difference",
            "https://leetcode.com/problems/minimum-average-difference/",
            "Medium"
          ],
          [
            232,
            1685,
            "Sum of Absolute Differences in a Sorted Array",
            "https://leetcode.com/problems/sum-of-absolute-differences-in-a-sorted-array/",
            "Medium"
          ],
          [
            233,
            304,
            "Range Sum Query 2D - Immutable",
            "https://leetcode.com/problems/range-sum-query-2d-immutable/",
            "Medium"
          ]
        ]
      },
      {
        "title": "Prefix sums with hashing",
        "note": "Notice what the map needs to store. Counting uses frequencies, while finding a longest span usually uses the earliest index.",
        "questions": [
          [
            234,
            560,
            "Subarray Sum Equals K",
            "https://leetcode.com/problems/subarray-sum-equals-k/",
            "Medium"
          ],
          [
            235,
            525,
            "Contiguous Array",
            "https://leetcode.com/problems/contiguous-array/",
            "Medium"
          ],
          [
            236,
            974,
            "Subarray Sums Divisible by K",
            "https://leetcode.com/problems/subarray-sums-divisible-by-k/",
            "Medium"
          ],
          [
            237,
            523,
            "Continuous Subarray Sum",
            "https://leetcode.com/problems/continuous-subarray-sum/",
            "Medium"
          ],
          [
            238,
            1124,
            "Longest Well-Performing Interval",
            "https://leetcode.com/problems/longest-well-performing-interval/",
            "Medium"
          ]
        ]
      },
      {
        "title": "Difference arrays and advanced prefix sums",
        "note": "Use boundary updates for ranges, binary search over cumulative weights, and ordered counting over prefix sums.",
        "questions": [
          [
            239,
            1109,
            "Corporate Flight Bookings",
            "https://leetcode.com/problems/corporate-flight-bookings/",
            "Medium"
          ],
          [
            240,
            528,
            "Random Pick with Weight",
            "https://leetcode.com/problems/random-pick-with-weight/",
            "Medium"
          ],
          [
            241,
            327,
            "Count of Range Sum",
            "https://leetcode.com/problems/count-of-range-sum/",
            "Hard"
          ]
        ]
      }
    ]
  },
  {
    "id": "two-pointers-sliding-window",
    "title": "Two Pointers and Sliding Window",
    "groups": [
      {
        "title": "Two pointers on sorted arrays and in-place writes",
        "note": "Use sorted order to decide which pointer to move, or separate the positions you read and write.",
        "questions": [
          [
            242,
            977,
            "Squares of a Sorted Array",
            "https://leetcode.com/problems/squares-of-a-sorted-array/",
            "Easy"
          ],
          [
            243,
            283,
            "Move Zeroes",
            "https://leetcode.com/problems/move-zeroes/",
            "Easy"
          ],
          [
            244,
            167,
            "Two Sum II - Input Array Is Sorted",
            "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
            "Medium"
          ],
          [
            245,
            16,
            "3Sum Closest",
            "https://leetcode.com/problems/3sum-closest/",
            "Medium"
          ],
          [
            246,
            881,
            "Boats to Save People",
            "https://leetcode.com/problems/boats-to-save-people/",
            "Medium"
          ]
        ]
      },
      {
        "title": "Fixed-size windows",
        "note": "Keep the window length fixed while updating the count, sum, or frequency of items entering and leaving.",
        "questions": [
          [
            247,
            1456,
            "Maximum Number of Vowels in a Substring of Given Length",
            "https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/",
            "Medium"
          ],
          [
            248,
            1052,
            "Grumpy Bookstore Owner",
            "https://leetcode.com/problems/grumpy-bookstore-owner/",
            "Medium"
          ],
          [
            249,
            438,
            "Find All Anagrams in a String",
            "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
            "Medium"
          ],
          [
            250,
            30,
            "Substring with Concatenation of All Words",
            "https://leetcode.com/problems/substring-with-concatenation-of-all-words/",
            "Hard"
          ]
        ]
      },
      {
        "title": "Variable-size windows",
        "note": "Decide when a window becomes invalid and what must change before you can grow it again.",
        "questions": [
          [
            251,
            1004,
            "Max Consecutive Ones III",
            "https://leetcode.com/problems/max-consecutive-ones-iii/",
            "Medium"
          ],
          [
            252,
            209,
            "Minimum Size Subarray Sum",
            "https://leetcode.com/problems/minimum-size-subarray-sum/",
            "Medium"
          ],
          [
            253,
            904,
            "Fruit Into Baskets",
            "https://leetcode.com/problems/fruit-into-baskets/",
            "Medium"
          ],
          [
            254,
            713,
            "Subarray Product Less Than K",
            "https://leetcode.com/problems/subarray-product-less-than-k/",
            "Medium"
          ],
          [
            255,
            1838,
            "Frequency of the Most Frequent Element",
            "https://leetcode.com/problems/frequency-of-the-most-frequent-element/",
            "Medium"
          ]
        ]
      },
      {
        "title": "Advanced window counting and prefix deques",
        "note": "Count windows with exactly K distinct values, then compare positive-only windows with a problem that allows negative numbers.",
        "questions": [
          [
            256,
            992,
            "Subarrays with K Different Integers",
            "https://leetcode.com/problems/subarrays-with-k-different-integers/",
            "Hard"
          ],
          [
            257,
            862,
            "Shortest Subarray with Sum at Least K",
            "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/",
            "Hard"
          ]
        ]
      }
    ]
  },
  {
    "id": "intervals-greedy",
    "title": "Intervals and Greedy Scheduling",
    "groups": [
      {
        "title": "Interval insertion, intersections, and greedy choices",
        "note": "Practice combining ranges, finding where ranges intersect, and choosing intervals by their endpoints.",
        "questions": [
          [
            258,
            57,
            "Insert Interval",
            "https://leetcode.com/problems/insert-interval/",
            "Medium"
          ],
          [
            259,
            986,
            "Interval List Intersections",
            "https://leetcode.com/problems/interval-list-intersections/",
            "Medium"
          ],
          [
            260,
            435,
            "Non-overlapping Intervals",
            "https://leetcode.com/problems/non-overlapping-intervals/",
            "Medium"
          ],
          [
            261,
            452,
            "Minimum Number of Arrows to Burst Balloons",
            "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
            "Medium"
          ]
        ]
      },
      {
        "title": "Calendar conflicts and resource allocation",
        "note": "Compare detecting a conflict, counting rooms, assigning rooms, and answering interval queries.",
        "questions": [
          [
            262,
            729,
            "My Calendar I",
            "https://leetcode.com/problems/my-calendar-i/",
            "Medium"
          ],
          [
            263,
            2406,
            "Divide Intervals Into Minimum Number of Groups",
            "https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/",
            "Medium"
          ],
          [
            264,
            2402,
            "Meeting Rooms III",
            "https://leetcode.com/problems/meeting-rooms-iii/",
            "Hard"
          ],
          [
            265,
            1851,
            "Minimum Interval to Include Each Query",
            "https://leetcode.com/problems/minimum-interval-to-include-each-query/",
            "Hard"
          ]
        ]
      }
    ]
  },
  {
    "id": "binary-search-boundaries",
    "title": "Binary Search and Search on Answer",
    "groups": [
      {
        "title": "Boundaries in sorted data",
        "note": "Practice lower and upper bounds, finding a peak, locating a contiguous window, and looking up a timestamp.",
        "questions": [
          [
            266,
            35,
            "Search Insert Position",
            "https://leetcode.com/problems/search-insert-position/",
            "Easy"
          ],
          [
            267,
            34,
            "Find First and Last Position of Element in Sorted Array",
            "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
            "Medium"
          ],
          [
            268,
            162,
            "Find Peak Element",
            "https://leetcode.com/problems/find-peak-element/",
            "Medium"
          ],
          [
            269,
            658,
            "Find K Closest Elements",
            "https://leetcode.com/problems/find-k-closest-elements/",
            "Medium"
          ],
          [
            270,
            981,
            "Time Based Key-Value Store",
            "https://leetcode.com/problems/time-based-key-value-store/",
            "Medium"
          ]
        ]
      },
      {
        "title": "Binary search on a feasible answer",
        "note": "Define what makes a candidate feasible before deciding which half of the answer range to discard.",
        "questions": [
          [
            271,
            69,
            "Sqrt(x)",
            "https://leetcode.com/problems/sqrtx/",
            "Easy"
          ],
          [
            272,
            1011,
            "Capacity To Ship Packages Within D Days",
            "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
            "Medium"
          ],
          [
            273,
            1482,
            "Minimum Number of Days to Make m Bouquets",
            "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
            "Medium"
          ],
          [
            274,
            410,
            "Split Array Largest Sum",
            "https://leetcode.com/problems/split-array-largest-sum/",
            "Hard"
          ]
        ]
      }
    ]
  },
  {
    "id": "graph-modeling-paths",
    "title": "Graph Modeling and Paths",
    "groups": [
      {
        "title": "Building and interpreting a graph",
        "note": "Translate paths, trust relationships, ratios, and shared emails into a graph or connected components.",
        "questions": [
          [
            275,
            1971,
            "Find if Path Exists in Graph",
            "https://leetcode.com/problems/find-if-path-exists-in-graph/",
            "Easy"
          ],
          [
            276,
            997,
            "Find the Town Judge",
            "https://leetcode.com/problems/find-the-town-judge/",
            "Easy"
          ],
          [
            277,
            399,
            "Evaluate Division",
            "https://leetcode.com/problems/evaluate-division/",
            "Medium"
          ],
          [
            278,
            721,
            "Accounts Merge",
            "https://leetcode.com/problems/accounts-merge/",
            "Medium"
          ]
        ]
      },
      {
        "title": "Reachability and shortest paths in grids",
        "note": "Compare boundary traversal, an unweighted shortest path, reverse reachability, and a path scored by its highest elevation.",
        "questions": [
          [
            279,
            130,
            "Surrounded Regions",
            "https://leetcode.com/problems/surrounded-regions/",
            "Medium"
          ],
          [
            280,
            1091,
            "Shortest Path in Binary Matrix",
            "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
            "Medium"
          ],
          [
            281,
            417,
            "Pacific Atlantic Water Flow",
            "https://leetcode.com/problems/pacific-atlantic-water-flow/",
            "Medium"
          ],
          [
            282,
            778,
            "Swim in Rising Water",
            "https://leetcode.com/problems/swim-in-rising-water/",
            "Hard"
          ]
        ]
      },
      {
        "title": "Cycles, constrained paths, and implicit graphs",
        "note": "Track how direction, stop limits, and on-demand neighbors affect the state you need.",
        "questions": [
          [
            283,
            684,
            "Redundant Connection",
            "https://leetcode.com/problems/redundant-connection/",
            "Medium"
          ],
          [
            284,
            802,
            "Find Eventual Safe States",
            "https://leetcode.com/problems/find-eventual-safe-states/",
            "Medium"
          ],
          [
            285,
            787,
            "Cheapest Flights Within K Stops",
            "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
            "Medium"
          ],
          [
            286,
            127,
            "Word Ladder",
            "https://leetcode.com/problems/word-ladder/",
            "Hard"
          ]
        ]
      }
    ]
  },
  {
    "id": "tree-paths-state",
    "title": "Trees, Path State, and BST Updates",
    "groups": [
      {
        "title": "Root-to-leaf state and subtree checks",
        "note": "Decide what to carry down a path and when to compare whole subtrees. Revisit prefix sums in a tree.",
        "questions": [
          [
            287,
            112,
            "Path Sum",
            "https://leetcode.com/problems/path-sum/",
            "Easy"
          ],
          [
            288,
            572,
            "Subtree of Another Tree",
            "https://leetcode.com/problems/subtree-of-another-tree/",
            "Easy"
          ],
          [
            289,
            1448,
            "Count Good Nodes in Binary Tree",
            "https://leetcode.com/problems/count-good-nodes-in-binary-tree/",
            "Medium"
          ],
          [
            290,
            129,
            "Sum Root to Leaf Numbers",
            "https://leetcode.com/problems/sum-root-to-leaf-numbers/",
            "Medium"
          ],
          [
            291,
            437,
            "Path Sum III",
            "https://leetcode.com/problems/path-sum-iii/",
            "Medium"
          ]
        ]
      },
      {
        "title": "Parent links, BST deletion, and bottom-up decisions",
        "note": "Practice moving toward a parent, preserving BST order after deletion, and passing subtree decisions back up.",
        "questions": [
          [
            292,
            863,
            "All Nodes Distance K in Binary Tree",
            "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/",
            "Medium"
          ],
          [
            293,
            450,
            "Delete Node in a BST",
            "https://leetcode.com/problems/delete-node-in-a-bst/",
            "Medium"
          ],
          [
            294,
            337,
            "House Robber III",
            "https://leetcode.com/problems/house-robber-iii/",
            "Medium"
          ],
          [
            295,
            968,
            "Binary Tree Cameras",
            "https://leetcode.com/problems/binary-tree-cameras/",
            "Hard"
          ]
        ]
      }
    ]
  },
  {
    "id": "dp-state-recurrences",
    "title": "Dynamic Programming and State Design",
    "groups": [
      {
        "title": "Recurrences, counting, and grid states",
        "note": "Build from a short recurrence to counting ordered choices and combining neighboring grid states.",
        "questions": [
          [
            296,
            1137,
            "N-th Tribonacci Number",
            "https://leetcode.com/problems/n-th-tribonacci-number/",
            "Easy"
          ],
          [
            297,
            377,
            "Combination Sum IV",
            "https://leetcode.com/problems/combination-sum-iv/",
            "Medium"
          ],
          [
            298,
            221,
            "Maximal Square",
            "https://leetcode.com/problems/maximal-square/",
            "Medium"
          ]
        ]
      },
      {
        "title": "Substrings, subarrays, and subsequences",
        "note": "Distinguish contiguous matches from subsequences and choose state that reflects the difference.",
        "questions": [
          [
            299,
            647,
            "Palindromic Substrings",
            "https://leetcode.com/problems/palindromic-substrings/",
            "Medium"
          ],
          [
            300,
            718,
            "Maximum Length of Repeated Subarray",
            "https://leetcode.com/problems/maximum-length-of-repeated-subarray/",
            "Medium"
          ],
          [
            301,
            115,
            "Distinct Subsequences",
            "https://leetcode.com/problems/distinct-subsequences/",
            "Hard"
          ]
        ]
      },
      {
        "title": "State with a difference or two boundaries",
        "note": "Track a difference for arithmetic subsequences and use interval states for games and splitting problems.",
        "questions": [
          [
            302,
            1027,
            "Longest Arithmetic Subsequence",
            "https://leetcode.com/problems/longest-arithmetic-subsequence/",
            "Medium"
          ],
          [
            303,
            486,
            "Predict the Winner",
            "https://leetcode.com/problems/predict-the-winner/",
            "Medium"
          ],
          [
            304,
            312,
            "Burst Balloons",
            "https://leetcode.com/problems/burst-balloons/",
            "Hard"
          ]
        ]
      }
    ]
  },
  {
    "id": "data-structure-design",
    "title": "Data Structure Design",
    "groups": [
      {
        "title": "Fast lookup, history, and versioned reads",
        "note": "Choose a representation that makes each required operation efficient, including random selection and historical lookup.",
        "questions": [
          [
            305,
            380,
            "Insert Delete GetRandom O(1)",
            "https://leetcode.com/problems/insert-delete-getrandom-o1/",
            "Medium"
          ],
          [
            306,
            1472,
            "Design Browser History",
            "https://leetcode.com/problems/design-browser-history/",
            "Medium"
          ],
          [
            307,
            1146,
            "Snapshot Array",
            "https://leetcode.com/problems/snapshot-array/",
            "Medium"
          ]
        ]
      }
    ]
  }
];

if (typeof module !== "undefined" && module.exports) module.exports = expansionBatchData;
else window.FULL_DSA_EXPANSION = expansionBatchData;
