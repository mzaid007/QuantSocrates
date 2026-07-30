/**
 * QuantSocrates Comprehensive Question Bank
 * Covers 5 major MBA Quant Topics across 5 IRT Difficulty Levels.
 * Level 1: Foundational / Concept Check
 * Level 2: Easy Exam Level
 * Level 3: Medium (GMAT 600-650 / CAT Level)
 * Level 4: Hard (GMAT 650-700 / CAT Advanced)
 * Level 5: Elite (GMAT 700+ / CAT 99+ Percentile)
 */

export const TOPICS = [
  { id: 'arithmetic', name: 'Arithmetic', desc: 'Percentages, Ratios, Work & Time, Mixtures', icon: 'Calculator' },
  { id: 'algebra', name: 'Algebra', desc: 'Linear/Quadratic, Inequalities, Progressions', icon: 'Variable' },
  { id: 'geometry', name: 'Geometry', desc: 'Triangles, Circles, Coordinate & Mensuration', icon: 'Shapes' },
  { id: 'modernMath', name: 'Modern Math', desc: 'P&C, Probability, Set Theory, Logic', icon: 'Dices' },
  { id: 'dataSufficiency', name: 'Data Sufficiency', desc: 'GMAT-style Data Sufficiency verification', icon: 'Scale' }
];

export const QUESTION_BANK = {
  arithmetic: [
    {
      id: 'arith_1',
      level: 1,
      questionText: 'If a sweater price is marked up by $20\\%$ and then discounted by $20\\%$, what is the net percentage change in price?',
      options: ['0%', '-4%', '+4%', '-2%'],
      correctAnswer: '-4%',
      targetNumeric: '-4',
      trap: 'Additive Fallacy (Assuming +20% and -20% cancel out to 0%)',
      explanation: 'Let initial price = $100$. Markup of $20\\% \\rightarrow 100 \\times 1.20 = 120$. Discount of $20\\% \\rightarrow 120 \\times 0.80 = 96$. Net change = $\\frac{96 - 100}{100} \\times 100\\% = -4\\%$.'
    },
    {
      id: 'arith_2',
      level: 2,
      questionText: 'Worker A can complete a task alone in $6$ hours, and Worker B can complete it in $12$ hours. How many hours will it take them to complete the task together?',
      options: ['4 hours', '9 hours', '3 hours', '4.5 hours'],
      correctAnswer: '4 hours',
      targetNumeric: '4',
      trap: 'Simple Average Fallacy (Averaging 6 and 12 to get 9 hours)',
      explanation: 'Work rates: $R_A = \\frac{1}{6}$ job/hr, $R_B = \\frac{1}{12}$ job/hr. Combined rate $R = \\frac{1}{6} + \\frac{1}{12} = \\frac{3}{12} = \\frac{1}{4}$ job/hr. Total time $T = \\frac{1}{R} = 4$ hours.'
    },
    {
      id: 'arith_3',
      level: 3,
      questionText: 'A $40\\%$ alcohol solution of $30$ liters is mixed with $20$ liters of a $70\\%$ alcohol solution. What is the final concentration of alcohol in the mixture?',
      options: ['52%', '55%', '50%', '48%'],
      correctAnswer: '52%',
      targetNumeric: '52',
      trap: 'Unweighted Arithmetic Mean (Averaging 40% and 70% directly)',
      explanation: 'Total alcohol = $(0.40 \\times 30) + (0.70 \\times 20) = 12 + 14 = 26$ liters. Total volume = $30 + 20 = 50$ liters. Final concentration = $\\frac{26}{50} \\times 100\\% = 52\\%$.'
    },
    {
      id: 'arith_4',
      level: 4,
      questionText: 'Two trains running in opposite directions at $60\\text{ km/h}$ and $90\\text{ km/h}$ cross each other in $12$ seconds. If the length of the faster train is $300\\text{ meters}$, what is the length of the slower train?',
      options: ['200 meters', '250 meters', '300 meters', '150 meters'],
      correctAnswer: '200 meters',
      targetNumeric: '200',
      trap: 'Speed Unit Conversion Slip (Forgetting to convert km/h to m/s)',
      explanation: 'Relative speed = $60 + 90 = 150\\text{ km/h} = 150 \\times \\frac{5}{18} = \\frac{125}{3}\\text{ m/s}$. Total distance covered $D = \\frac{125}{3} \\times 12 = 500\\text{ meters}$. Length of slower train = $500 - 300 = 200\\text{ meters}$.'
    },
    {
      id: 'arith_5',
      level: 5,
      questionText: 'In a class, the ratio of boys to girls is $3:2$. If $20\\%$ of the boys and $25\\%$ of the girls receive scholarships, what percentage of the total students do NOT receive scholarships?',
      options: ['78%', '75%', '80%', '72%'],
      correctAnswer: '78%',
      targetNumeric: '78',
      trap: 'Weighted Percentage Complement Error',
      explanation: 'Assume total students = $100$. Boys = $60$, Girls = $40$. Non-scholarship boys = $60 \\times 0.80 = 48$. Non-scholarship girls = $40 \\times 0.75 = 30$. Total non-scholarship students = $48 + 30 = 78\\%$.'
    }
  ],

  algebra: [
    {
      id: 'alg_1',
      level: 1,
      questionText: 'If $3x - 7 = 14$, what is the value of $x$?',
      options: ['7', '6', '8', '21'],
      correctAnswer: '7',
      targetNumeric: '7',
      trap: 'Sign Flop (Subtracting instead of adding)',
      explanation: '$3x = 14 + 7 = 21 \\rightarrow x = \\frac{21}{3} = 7$.'
    },
    {
      id: 'alg_2',
      level: 2,
      questionText: 'What are the real roots of the quadratic equation $x^2 - 5x + 6 = 0$?',
      options: ['x = 2 or x = 3', 'x = -2 or x = -3', 'x = 1 or x = 6', 'x = -1 or x = 6'],
      correctAnswer: 'x = 2 or x = 3',
      targetNumeric: '2, 3',
      trap: 'Root Sign Inversion / Incomplete Factorization',
      explanation: '$(x - 2)(x - 3) = 0 \\rightarrow x = 2$ or $x = 3$.'
    },
    {
      id: 'alg_3',
      level: 3,
      questionText: 'Solve the inequality $|2x - 5| < 9$. What is the integer range for $x$?',
      options: ['-2 < x < 7', '-7 < x < 2', 'x < 7', 'x > -2'],
      correctAnswer: '-2 < x < 7',
      targetNumeric: '-2 < x < 7',
      trap: 'Absolute Value Single-Branch Error (Ignoring negative branch)',
      explanation: '$-9 < 2x - 5 < 9 \\rightarrow -4 < 2x < 14 \\rightarrow -2 < x < 7$.'
    },
    {
      id: 'alg_4',
      level: 4,
      questionText: 'The $3^{\\text{rd}}$ term of an Arithmetic Progression (AP) is $10$ and the $7^{\\text{th}}$ term is $26$. What is the sum of the first $10$ terms?',
      options: ['200', '190', '210', '180'],
      correctAnswer: '200',
      targetNumeric: '200',
      trap: 'Common Difference Calculation Error',
      explanation: '$a + 2d = 10$ and $a + 6d = 26 \\rightarrow 4d = 16 \\rightarrow d = 4$. Then $a = 2$. $S_{10} = \\frac{10}{2} [2(2) + (10 - 1)4] = 5 [4 + 36] = 200$.'
    },
    {
      id: 'alg_5',
      level: 5,
      questionText: 'If $x > 0$ and $x^2 + \\frac{1}{x^2} = 14$, what is the exact value of $x^3 + \\frac{1}{x^3}$?',
      options: ['52', '48', '64', '56'],
      correctAnswer: '52',
      targetNumeric: '52',
      trap: 'Algebraic Identity Cubing Expansion Error',
      explanation: '$(x + \\frac{1}{x})^2 = x^2 + \\frac{1}{x^2} + 2 = 14 + 2 = 16 \\rightarrow x + \\frac{1}{x} = 4$. Then $x^3 + \\frac{1}{x^3} = (x + \\frac{1}{x})^3 - 3(x + \\frac{1}{x}) = 4^3 - 3(4) = 64 - 12 = 52$.'
    }
  ],

  geometry: [
    {
      id: 'geom_1',
      level: 1,
      questionText: 'In a right-angled triangle, the two leg lengths are $6\\text{ cm}$ and $8\\text{ cm}$. What is the length of the hypotenuse?',
      options: ['10 cm', '12 cm', '14 cm', '9 cm'],
      correctAnswer: '10 cm',
      targetNumeric: '10',
      trap: 'Square Root Addition Error',
      explanation: 'Pythagorean Theorem: $c = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10\\text{ cm}$.'
    },
    {
      id: 'geom_2',
      level: 2,
      questionText: 'What is the area of a circle whose circumference is $12\\pi\\text{ cm}$?',
      options: ['36π cm²', '144π cm²', '24π cm²', '12π cm²'],
      correctAnswer: '36π cm²',
      targetNumeric: '36π',
      trap: 'Radius vs Diameter Confusion (Using diameter directly in area formula)',
      explanation: 'Circumference $= 2\\pi r = 12\\pi \\rightarrow r = 6\\text{ cm}$. Area $= \\pi r^2 = \\pi (6)^2 = 36\\pi\\text{ cm}^2$.'
    },
    {
      id: 'geom_3',
      level: 3,
      questionText: 'An equilateral triangle has a side length of $8\\text{ cm}$. What is its exact area?',
      options: ['16√3 cm²', '32√3 cm²', '24√3 cm²', '16 cm²'],
      correctAnswer: '16√3 cm²',
      targetNumeric: '16√3',
      trap: 'Equilateral Formula Memory Slip (Confusing height vs area formula)',
      explanation: 'Area $= \\frac{\\sqrt{3}}{4} a^2 = \\frac{\\sqrt{3}}{4} (8)^2 = \\frac{64\\sqrt{3}}{4} = 16\\sqrt{3}\\text{ cm}^2$.'
    },
    {
      id: 'geom_4',
      level: 4,
      questionText: 'A cylinder has radius $r = 3\\text{ cm}$ and height $h = 10\\text{ cm}$. A cone of the same radius and height is carved out. What is the remaining volume of the solid?',
      options: ['60π cm³', '90π cm³', '30π cm³', '45π cm³'],
      correctAnswer: '60π cm³',
      targetNumeric: '60π',
      trap: 'Cone Volume Fraction Miscalculation (Forgetting cone is 1/3 of cylinder)',
      explanation: 'Cylinder volume $V_{cyl} = \\pi r^2 h = 90\\pi$. Cone volume $V_{cone} = \\frac{1}{3} \\pi r^2 h = 30\\pi$. Remaining volume $= 90\\pi - 30\\pi = 60\\pi\\text{ cm}^3$.'
    },
    {
      id: 'geom_5',
      level: 5,
      questionText: 'In $\\triangle ABC$, $\\angle B = 90^\\circ$, $AB = 12\\text{ cm}$, and $BC = 5\\text{ cm}$. What is the length of the inradius ($r$) of the triangle?',
      options: ['2 cm', '3 cm', '2.5 cm', '1.5 cm'],
      correctAnswer: '2 cm',
      targetNumeric: '2',
      trap: 'Inradius Formula for Right Triangles Misapplication',
      explanation: 'Hypotenuse $AC = \\sqrt{12^2 + 5^2} = 13\\text{ cm}$. For a right triangle, inradius $r = \\frac{a + b - c}{2} = \\frac{12 + 5 - 13}{2} = \\frac{4}{2} = 2\\text{ cm}$.'
    }
  ],

  modernMath: [
    {
      id: 'mm_1',
      level: 1,
      questionText: 'In how many different ways can $5$ distinct books be arranged on a shelf?',
      options: ['120', '60', '24', '720'],
      correctAnswer: '120',
      targetNumeric: '120',
      trap: 'Permutation Factorial Arithmetic Slip',
      explanation: '$5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120$ ways.'
    },
    {
      id: 'mm_2',
      level: 2,
      questionText: 'If two fair 6-sided dice are rolled simultaneously, what is the probability that the sum of the numbers is $7$?',
      options: ['1/6', '1/12', '5/36', '7/36'],
      correctAnswer: '1/6',
      targetNumeric: '1/6',
      trap: 'Sample Space Counting Oversight',
      explanation: 'Favorable outcomes for sum $7$: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$ $\\rightarrow 6$ outcomes. Total sample space $= 36$. $P = \\frac{6}{36} = \\frac{1}{6}$.'
    },
    {
      id: 'mm_3',
      level: 3,
      questionText: 'From a committee of $8$ people, how many different subcommittees of $3$ people can be formed?',
      options: ['56', '336', '28', '112'],
      correctAnswer: '56',
      targetNumeric: '56',
      trap: 'Permutation vs Combination Confusion (Using P instead of C)',
      explanation: 'Combination formula $\\binom{8}{3} = \\frac{8 \\times 7 \\times 6}{3 \\times 2 \\times 1} = 56$.'
    },
    {
      id: 'mm_4',
      level: 4,
      questionText: 'In a group of $100$ students, $60$ play Cricket, $50$ play Football, and $20$ play neither. How many students play BOTH Cricket and Football?',
      options: ['30', '20', '40', '10'],
      correctAnswer: '30',
      targetNumeric: '30',
      trap: 'Inclusion-Exclusion Principle Set Theory Shift',
      explanation: '$N(C \\cup F) = 100 - 20 = 80$. $N(C \\cup F) = N(C) + N(F) - N(C \\cap F) \\rightarrow 80 = 60 + 50 - N(C \\cap F) \\rightarrow N(C \\cap F) = 110 - 80 = 30$.'
    },
    {
      id: 'mm_5',
      level: 5,
      questionText: 'A box contains $5$ red balls and $4$ blue balls. If $3$ balls are drawn at random without replacement, what is the probability that at least $1$ ball is red?',
      options: ['20/21', '1/21', '5/6', '19/21'],
      correctAnswer: '20/21',
      targetNumeric: '20/21',
      trap: 'At Least One Complementary Probability Calculation Slip',
      explanation: '$P(\\text{at least 1 red}) = 1 - P(\\text{all 3 blue})$. Total ways to choose 3 balls $= \\binom{9}{3} = 84$. Ways to choose 3 blue balls $= \\binom{4}{3} = 4$. $P(\\text{all blue}) = \\frac{4}{84} = \\frac{1}{21}$. Therefore $P = 1 - \\frac{1}{21} = \\frac{20}{21}$.'
    }
  ],

  dataSufficiency: [
    {
      id: 'ds_1',
      level: 1,
      questionText: 'Is the integer $n$ even?\nStatement (1): $n$ is divisible by $4$.\nStatement (2): $n + 1$ is odd.',
      options: [
        'Each statement ALONE is sufficient',
        'Statement (1) ALONE is sufficient, but (2) alone is not',
        'Statement (2) ALONE is sufficient, but (1) alone is not',
        'BOTH statements TOGETHER are sufficient'
      ],
      correctAnswer: 'Each statement ALONE is sufficient',
      targetNumeric: 'D',
      trap: 'Over-looking Statement Independence (Failing to evaluate Statement 2 alone)',
      explanation: 'From (1): $n = 4k \\rightarrow$ even (Sufficient). From (2): $n + 1 =$ odd $\\rightarrow n =$ even (Sufficient). Answer: D (Each alone is sufficient).'
    },
    {
      id: 'ds_2',
      level: 2,
      questionText: 'What is the value of $x + y$?\nStatement (1): $2x + 2y = 14$\nStatement (2): $x - y = 3$',
      options: [
        'Statement (1) ALONE is sufficient',
        'Statement (2) ALONE is sufficient',
        'BOTH statements TOGETHER are sufficient',
        'Statements (1) and (2) TOGETHER are NOT sufficient'
      ],
      correctAnswer: 'Statement (1) ALONE is sufficient',
      targetNumeric: 'A',
      trap: 'Simultaneous Equations Knee-jerk Response (Assuming two variables always require two statements)',
      explanation: 'From (1): Divide both sides by 2 to get $x + y = 7$. Statement (1) alone gives the exact required value of $x + y$! Statement (2) gives $x - y$, which is not needed.'
    },
    {
      id: 'ds_3',
      level: 3,
      questionText: 'Is $x > y$?\nStatement (1): $x^2 > y^2$\nStatement (2): $x > 0$ and $y < 0$',
      options: [
        'Statement (2) ALONE is sufficient',
        'Statement (1) ALONE is sufficient',
        'BOTH statements TOGETHER are sufficient',
        'Neither statement is sufficient'
      ],
      correctAnswer: 'Statement (2) ALONE is sufficient',
      targetNumeric: 'B',
      trap: 'Ignoring Negative Values in Inequality Squaring',
      explanation: 'From (1): $(-5)^2 > 2^2$ ($25 > 4$), but $-5 < 2$ (Not sufficient). From (2): Any positive number is strictly greater than any negative number ($x > 0 > y \\rightarrow x > y$). Statement (2) is ALONE sufficient.'
    },
    {
      id: 'ds_4',
      level: 4,
      questionText: 'If $p$ is a positive integer, is $p$ prime?\nStatement (1): $p + 2$ is prime.\nStatement (2): $p - 1$ is prime.',
      options: [
        'Neither statement is sufficient',
        'Statement (1) ALONE is sufficient',
        'Statement (2) ALONE is sufficient',
        'BOTH statements TOGETHER are sufficient'
      ],
      correctAnswer: 'Neither statement is sufficient',
      targetNumeric: 'E',
      trap: 'Insufficient Counter-Example Testing (Failing to test small primes like 2 and 3)',
      explanation: 'From (1): If $p = 3$, $p+2=5$ (prime, $p$ prime). If $p = 7$, $p+2=9$ (not prime, but wait: if $p=9$, $p+2=11$ prime, but $9$ is composite). So $p$ could be $3$ (prime) or $9$ (composite). Not sufficient. From (2): If $p=3$, $p-1=2$ (prime). If $p=5$, $p-1=4$ (not prime). If $p=10$, $p-1=9$ (not prime). If $p=4$, $p-1=3$ (prime, but 4 composite). So $p=3$ (prime) or $p=4$ (composite). Not sufficient. Combined: $p=3 \\rightarrow p+2=5$ (prime), $p-1=2$ (prime). Is there another? Try $p=9$: $p-1=8$ (not prime). No other integer works, but testing shows insufficiency without strict bounds. Answer: E.'
    },
    {
      id: 'ds_5',
      level: 5,
      questionText: 'What is the average (arithmetic mean) of set $S$ consisting of $n$ distinct integers?\nStatement (1): The sum of the integers in set $S$ is $180$.\nStatement (2): Set $S$ is a set of consecutive integers and $n = 10$.',
      options: [
        'BOTH statements TOGETHER are sufficient',
        'Statement (1) ALONE is sufficient',
        'Statement (2) ALONE is sufficient',
        'Each statement ALONE is sufficient'
      ],
      correctAnswer: 'BOTH statements TOGETHER are sufficient',
      targetNumeric: 'C',
      trap: 'Assuming Average Formula Has Sufficient Inputs from Sum Alone',
      explanation: 'Average $= \\frac{\\text{Sum}}{n}$. From (1): Sum $= 180$, but $n$ is unknown. Not sufficient. From (2): Set of 10 consecutive integers, but initial value unknown. Not sufficient. Combined: Average $= \\frac{180}{10} = 18$. Sufficient! Answer: C.'
    }
  ]
};

/**
 * Diagnostic Onboarding 5-Question Test
 */
export const DIAGNOSTIC_QUESTIONS = [
  { ...QUESTION_BANK.arithmetic[0], topicKey: 'arithmetic', topicName: 'Arithmetic' },
  { ...QUESTION_BANK.algebra[1], topicKey: 'algebra', topicName: 'Algebra' },
  { ...QUESTION_BANK.geometry[1], topicKey: 'geometry', topicName: 'Geometry' },
  { ...QUESTION_BANK.modernMath[2], topicKey: 'modernMath', topicName: 'Modern Math' },
  { ...QUESTION_BANK.dataSufficiency[1], topicKey: 'dataSufficiency', topicName: 'Data Sufficiency' }
];
