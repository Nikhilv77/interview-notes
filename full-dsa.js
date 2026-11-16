"use strict";

const expansionPatterns = [
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
];

if (typeof module !== "undefined" && module.exports) module.exports = expansionPatterns;
else window.FULL_DSA_EXPANSION = expansionPatterns;
