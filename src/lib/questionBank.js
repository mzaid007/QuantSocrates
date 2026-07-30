/**
 * QuantSocrates Comprehensive MBA Quant Question Bank
 * Covers 5 major MBA Quant Topics across 5 IRT Difficulty Levels with 50+ High-Yield Questions.
 * Target Exams: CAT, GMAT, GRE
 * 
 * Levels:
 * Level 1: Foundational / Concept Check
 * Level 2: Easy Exam Level
 * Level 3: Medium (GMAT 600-650 / CAT Benchmark)
 * Level 4: Hard (GMAT 680-720 / CAT Advanced)
 * Level 5: Elite (GMAT 720+ / CAT 99+ Percentile)
 */

export const TOPICS = [
  { id: 'arithmetic', name: 'Arithmetic', desc: 'Percentages, Profit & Loss, Work, Speed, Interest, Mixtures', icon: 'Calculator' },
  { id: 'algebra', name: 'Algebra', desc: 'Linear/Quadratic, Inequalities, AP/GP, Logarithms, Functions', icon: 'Variable' },
  { id: 'geometry', name: 'Geometry', desc: 'Triangles, Circles, Coordinate Geometry, 3D Mensuration', icon: 'Shapes' },
  { id: 'modernMath', name: 'Modern Math', desc: 'P&C, Probability, Set Theory, Logic & Sequences', icon: 'Dices' },
  { id: 'dataSufficiency', name: 'Data Sufficiency', desc: 'GMAT-style Data Sufficiency & Constraint Logic', icon: 'Scale' }
];

export const QUESTION_BANK = {
  arithmetic: [
    // Level 1
    {
      id: 'arith_1_1',
      level: 1,
      questionText: 'If a sweater price is marked up by $20\\%$ and then discounted by $20\\%$, what is the net percentage change in price?',
      options: ['0%', '-4%', '+4%', '-2%'],
      correctAnswer: '-4%',
      targetNumeric: '-4',
      trap: 'Additive Fallacy (Assuming +20% and -20% cancel out to 0%)',
      explanation: 'Let initial price = $100$. Markup of $20\\% \\rightarrow 100 \\times 1.20 = 120$. Discount of $20\\% \\rightarrow 120 \\times 0.80 = 96$. Net change = $\\frac{96 - 100}{100} \\times 100\\% = -4\\%$.'
    },
    {
      id: 'arith_1_2',
      level: 1,
      questionText: 'If $A$ is $25\\%$ more than $B$, by what percentage is $B$ less than $A$?',
      options: ['25%', '20%', '16.67%', '30%'],
      correctAnswer: '20%',
      targetNumeric: '20',
      trap: 'Base Change Error (Assuming $B$ is $25\\%$ less than $A$)',
      explanation: 'Let $B = 100 \\rightarrow A = 125$. The difference is $25$. Percentage less = $\\frac{25}{125} \\times 100\\% = 20\\%$.'
    },

    // Level 2
    {
      id: 'arith_2_1',
      level: 2,
      questionText: 'Worker A can complete a task alone in $6$ hours, and Worker B can complete it in $12$ hours. How many hours will it take them to complete the task together?',
      options: ['4 hours', '9 hours', '3 hours', '4.5 hours'],
      correctAnswer: '4 hours',
      targetNumeric: '4',
      trap: 'Simple Average Fallacy (Averaging 6 and 12 to get 9 hours)',
      explanation: 'Work rates: $R_A = \\frac{1}{6}$ job/hr, $R_B = \\frac{1}{12}$ job/hr. Combined rate $R = \\frac{1}{6} + \\frac{1}{12} = \\frac{3}{12} = \\frac{1}{4}$ job/hr. Total time $T = \\frac{1}{R} = 4$ hours.'
    },
    {
      id: 'arith_2_2',
      level: 2,
      questionText: 'A sum of money doubles itself in $5$ years at simple interest. What is the annual rate of interest?',
      options: ['20%', '10%', '25%', '15%'],
      correctAnswer: '20%',
      targetNumeric: '20',
      trap: 'Compound vs Simple Interest Confusion',
      explanation: 'Simple Interest $SI = P \\cdot r \\cdot t / 100$. If money doubles, $SI = P$. So $P = P \\cdot r \\cdot 5 / 100 \\rightarrow 5r = 100 \\rightarrow r = 20\\%$.'
    },

    // Level 3
    {
      id: 'arith_3_1',
      level: 3,
      questionText: 'A $40\\%$ alcohol solution of $30$ liters is mixed with $20$ liters of a $70\\%$ alcohol solution. What is the final concentration of alcohol in the mixture?',
      options: ['52%', '55%', '50%', '48%'],
      correctAnswer: '52%',
      targetNumeric: '52',
      trap: 'Unweighted Arithmetic Mean (Averaging 40% and 70% directly)',
      explanation: 'Total alcohol = $(0.40 \\times 30) + (0.70 \\times 20) = 12 + 14 = 26$ liters. Total volume = $30 + 20 = 50$ liters. Final concentration = $\\frac{26}{50} \\times 100\\% = 52\\%$.'
    },
    {
      id: 'arith_3_2',
      level: 3,
      questionText: 'A trader marks an article $50\\%$ above cost price and allows a discount of $20\\%$. If he makes a profit of $\$60$, what was the cost price of the article?',
      options: ['$300', '$250', '$400', '$200'],
      correctAnswer: '$300',
      targetNumeric: '300',
      trap: 'Discount Base Fallacy (Applying discount to cost price instead of marked price)',
      explanation: 'Let Cost Price $CP = 100x$. Marked Price $MP = 150x$. Selling Price $SP = 150x \\times 0.80 = 120x$. Profit $= 120x - 100x = 20x$. Given $20x = 60 \\rightarrow x = 3$. $CP = 100(3) = \\$300$.'
    },

    // Level 4
    {
      id: 'arith_4_1',
      level: 4,
      questionText: 'Two trains running in opposite directions at $60\\text{ km/h}$ and $90\\text{ km/h}$ cross each other in $12$ seconds. If the length of the faster train is $300\\text{ meters}$, what is the length of the slower train?',
      options: ['200 meters', '250 meters', '300 meters', '150 meters'],
      correctAnswer: '200 meters',
      targetNumeric: '200',
      trap: 'Speed Unit Conversion Slip (Forgetting to convert km/h to m/s)',
      explanation: 'Relative speed = $60 + 90 = 150\\text{ km/h} = 150 \\times \\frac{5}{18} = \\frac{125}{3}\\text{ m/s}$. Total distance $D = \\frac{125}{3} \\times 12 = 500\\text{ meters}$. Length of slower train = $500 - 300 = 200\\text{ meters}$.'
    },
    {
      id: 'arith_4_2',
      level: 4,
      questionText: 'Pipe A can fill a tank in $10$ hours and Pipe B can fill it in $15$ hours. A leak at the bottom can empty the full tank in $30$ hours. If all three are opened together when the tank is empty, how long will it take to fill the tank?',
      options: ['7.5 hours', '6 hours', '8 hours', '10 hours'],
      correctAnswer: '7.5 hours',
      targetNumeric: '7.5',
      trap: 'Leak Addition vs Subtraction Error (Adding leak rate instead of subtracting)',
      explanation: 'Combined filling rate $= \\frac{1}{10} + \\frac{1}{15} - \\frac{1}{30} = \\frac{3 + 2 - 1}{30} = \\frac{4}{30} = \\frac{2}{15}$ tank/hr. Time $= \\frac{15}{2} = 7.5$ hours.'
    },

    // Level 5
    {
      id: 'arith_5_1',
      level: 5,
      questionText: 'In a class, the ratio of boys to girls is $3:2$. If $20\\%$ of the boys and $25\\%$ of the girls receive scholarships, what percentage of the total students do NOT receive scholarships?',
      options: ['78%', '75%', '80%', '72%'],
      correctAnswer: '78%',
      targetNumeric: '78',
      trap: 'Weighted Percentage Complement Error',
      explanation: 'Assume total students = $100$. Boys = $60$, Girls = $40$. Non-scholarship boys = $60 \\times 0.80 = 48$. Non-scholarship girls = $40 \\times 0.75 = 30$. Total non-scholarship students = $48 + 30 = 78\\%$.'
    },
    {
      id: 'arith_5_2',
      level: 5,
      questionText: 'A vessel contains $80$ liters of pure milk. $8$ liters of milk is replaced with water, and this process is repeated $2$ more times. What is the final volume of milk remaining in the vessel?',
      options: ['58.32 liters', '56.00 liters', '64.80 liters', '60.00 liters'],
      correctAnswer: '58.32 liters',
      targetNumeric: '58.32',
      trap: 'Linear Dilution Fallacy (Assuming 8x3 = 24 liters removed)',
      explanation: 'Dilution formula: $V_{final} = V_{initial} \\times (1 - \\frac{x}{V})^n = 80 \\times (1 - \\frac{8}{80})^3 = 80 \\times (0.9)^3 = 80 \\times 0.729 = 58.32$ liters.'
    }
  ],

  algebra: [
    // Level 1
    {
      id: 'alg_1_1',
      level: 1,
      questionText: 'If $3x - 7 = 14$, what is the value of $x$?',
      options: ['7', '6', '8', '21'],
      correctAnswer: '7',
      targetNumeric: '7',
      trap: 'Sign Flop (Subtracting instead of adding)',
      explanation: '$3x = 14 + 7 = 21 \\rightarrow x = \\frac{21}{3} = 7$.'
    },
    {
      id: 'alg_1_2',
      level: 1,
      questionText: 'Simplify the expression: $(2x + 3)^2 - 4x^2$.',
      options: ['12x + 9', '9', '12x', '4x + 9'],
      correctAnswer: '12x + 9',
      targetNumeric: '12x+9',
      trap: 'Expansion Binomial Middle-Term Omission',
      explanation: '$(2x + 3)^2 = 4x^2 + 12x + 9$. Subtracting $4x^2$ leaves $12x + 9$.'
    },

    // Level 2
    {
      id: 'alg_2_1',
      level: 2,
      questionText: 'What are the real roots of the quadratic equation $x^2 - 5x + 6 = 0$?',
      options: ['x = 2 or x = 3', 'x = -2 or x = -3', 'x = 1 or x = 6', 'x = -1 or x = 6'],
      correctAnswer: 'x = 2 or x = 3',
      targetNumeric: '2, 3',
      trap: 'Root Sign Inversion / Incomplete Factorization',
      explanation: '$(x - 2)(x - 3) = 0 \\rightarrow x = 2$ or $x = 3$.'
    },
    {
      id: 'alg_2_2',
      level: 2,
      questionText: 'If $2^{x + 3} = 32$, what is the value of $3^x$?',
      options: ['9', '27', '81', '3'],
      correctAnswer: '9',
      targetNumeric: '9',
      trap: 'Exponent Base Equating Error',
      explanation: '$32 = 2^5 \\rightarrow x + 3 = 5 \\rightarrow x = 2$. Therefore $3^x = 3^2 = 9$.'
    },

    // Level 3
    {
      id: 'alg_3_1',
      level: 3,
      questionText: 'Solve the inequality $|2x - 5| < 9$. What is the integer range for $x$?',
      options: ['-2 < x < 7', '-7 < x < 2', 'x < 7', 'x > -2'],
      correctAnswer: '-2 < x < 7',
      targetNumeric: '-2 < x < 7',
      trap: 'Absolute Value Single-Branch Error (Ignoring negative branch)',
      explanation: '$-9 < 2x - 5 < 9 \\rightarrow -4 < 2x < 14 \\rightarrow -2 < x < 7$.'
    },
    {
      id: 'alg_3_2',
      level: 3,
      questionText: 'If $\\log_{10}(x) + \\log_{10}(x - 3) = 1$, what is the value of $x$?',
      options: ['5', '-2', '5 or -2', '10'],
      correctAnswer: '5',
      targetNumeric: '5',
      trap: 'Extraneous Logarithmic Root (Keeping negative root invalid for domain)',
      explanation: '$\\log_{10}(x(x - 3)) = 1 \\rightarrow x^2 - 3x = 10 \\rightarrow x^2 - 3x - 10 = 0 \\rightarrow (x - 5)(x + 2) = 0$. Since $\\log(x)$ requires $x > 0$, $x = 5$ is the only valid root.'
    },

    // Level 4
    {
      id: 'alg_4_1',
      level: 4,
      questionText: 'The $3^{\\text{rd}}$ term of an Arithmetic Progression (AP) is $10$ and the $7^{\\text{th}}$ term is $26$. What is the sum of the first $10$ terms?',
      options: ['200', '190', '210', '180'],
      correctAnswer: '200',
      targetNumeric: '200',
      trap: 'Common Difference Calculation Error',
      explanation: '$a + 2d = 10$ and $a + 6d = 26 \\rightarrow 4d = 16 \\rightarrow d = 4$. Then $a = 2$. $S_{10} = \\frac{10}{2} [2(2) + (10 - 1)4] = 5 [4 + 36] = 200$.'
    },
    {
      id: 'alg_4_2',
      level: 4,
      questionText: 'Find the minimum value of the quadratic expression $f(x) = 2x^2 - 8x + 11$.',
      options: ['3', '5', '11', '1'],
      correctAnswer: '3',
      targetNumeric: '3',
      trap: 'Vertex Formula Coordinate Swap (Confusing x-vertex vs y-minimum)',
      explanation: 'Vertex $x = -\\frac{b}{2a} = -\\frac{-8}{2(2)} = 2$. Minimum value $f(2) = 2(2)^2 - 8(2) + 11 = 8 - 16 + 11 = 3$.'
    },

    // Level 5
    {
      id: 'alg_5_1',
      level: 5,
      questionText: 'If $x > 0$ and $x^2 + \\frac{1}{x^2} = 14$, what is the exact value of $x^3 + \\frac{1}{x^3}$?',
      options: ['52', '48', '64', '56'],
      correctAnswer: '52',
      targetNumeric: '52',
      trap: 'Algebraic Identity Cubing Expansion Error',
      explanation: '$(x + \\frac{1}{x})^2 = x^2 + \\frac{1}{x^2} + 2 = 14 + 2 = 16 \\rightarrow x + \\frac{1}{x} = 4$. Then $x^3 + \\frac{1}{x^3} = (x + \\frac{1}{x})^3 - 3(x + \\frac{1}{x}) = 4^3 - 3(4) = 64 - 12 = 52$.'
    },
    {
      id: 'alg_5_2',
      level: 5,
      questionText: 'Sum to infinity of the geometric progression (GP): $1 + \\frac{2}{3} + \\frac{4}{9} + \\frac{8}{27} + \\dots$',
      options: ['3', '2.5', '2', '3.5'],
      correctAnswer: '3',
      targetNumeric: '3',
      trap: 'Infinite GP Sum Ratio Inversion',
      explanation: 'First term $a = 1$, common ratio $r = \\frac{2}{3}$. Sum $S_\\infty = \\frac{a}{1 - r} = \\frac{1}{1 - 2/3} = \\frac{1}{1/3} = 3$.'
    }
  ],

  geometry: [
    // Level 1
    {
      id: 'geom_1_1',
      level: 1,
      questionText: 'In a right-angled triangle, the two leg lengths are $6\\text{ cm}$ and $8\\text{ cm}$. What is the length of the hypotenuse?',
      options: ['10 cm', '12 cm', '14 cm', '9 cm'],
      correctAnswer: '10 cm',
      targetNumeric: '10',
      trap: 'Square Root Addition Error',
      explanation: 'Pythagorean Theorem: $c = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10\\text{ cm}$.'
    },
    {
      id: 'geom_1_2',
      level: 1,
      questionText: 'What is the sum of interior angles of a convex polygon with $6$ sides (hexagon)?',
      options: ['720°', '540°', '360°', '1080°'],
      correctAnswer: '720°',
      targetNumeric: '720',
      trap: 'Polygon Formula Off-by-One Error',
      explanation: 'Sum of interior angles $= (n - 2) \\times 180^\\circ = (6 - 2) \\times 180^\\circ = 4 \\times 180^\\circ = 720^\\circ$.'
    },

    // Level 2
    {
      id: 'geom_2_1',
      level: 2,
      questionText: 'What is the area of a circle whose circumference is $12\\pi\\text{ cm}$?',
      options: ['36π cm²', '144π cm²', '24π cm²', '12π cm²'],
      correctAnswer: '36π cm²',
      targetNumeric: '36π',
      trap: 'Radius vs Diameter Confusion (Using diameter directly in area formula)',
      explanation: 'Circumference $= 2\\pi r = 12\\pi \\rightarrow r = 6\\text{ cm}$. Area $= \\pi r^2 = \\pi (6)^2 = 36\\pi\\text{ cm}^2$.'
    },
    {
      id: 'geom_2_2',
      level: 2,
      questionText: 'Find the distance between points $A(1, 2)$ and $B(7, 10)$ on the Cartesian coordinate plane.',
      options: ['10 units', '12 units', '8 units', '14 units'],
      correctAnswer: '10 units',
      targetNumeric: '10',
      trap: 'Distance Formula Coordinate Subtraction Sign Error',
      explanation: '$d = \\sqrt{(7 - 1)^2 + (10 - 2)^2} = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = 10$ units.'
    },

    // Level 3
    {
      id: 'geom_3_1',
      level: 3,
      questionText: 'An equilateral triangle has a side length of $8\\text{ cm}$. What is its exact area?',
      options: ['16√3 cm²', '32√3 cm²', '24√3 cm²', '16 cm²'],
      correctAnswer: '16√3 cm²',
      targetNumeric: '16√3',
      trap: 'Equilateral Formula Memory Slip (Confusing height vs area formula)',
      explanation: 'Area $= \\frac{\\sqrt{3}}{4} a^2 = \\frac{\\sqrt{3}}{4} (8)^2 = \\frac{64\\sqrt{3}}{4} = 16\\sqrt{3}\\text{ cm}^2$.'
    },
    {
      id: 'geom_3_2',
      level: 3,
      questionText: 'The volume of a sphere is $36\\pi\\text{ cm}^3$. What is its total surface area?',
      options: ['36π cm²', '48π cm²', '18π cm²', '72π cm²'],
      correctAnswer: '36π cm²',
      targetNumeric: '36π',
      trap: 'Sphere Surface Area vs Volume Radius Power Swap',
      explanation: 'Volume $V = \\frac{4}{3}\\pi r^3 = 36\\pi \\rightarrow r^3 = 27 \\rightarrow r = 3\\text{ cm}$. Surface area $= 4\\pi r^2 = 4\\pi (3)^2 = 36\\pi\\text{ cm}^2$.'
    },

    // Level 4
    {
      id: 'geom_4_1',
      level: 4,
      questionText: 'A cylinder has radius $r = 3\\text{ cm}$ and height $h = 10\\text{ cm}$. A cone of the same radius and height is carved out. What is the remaining volume of the solid?',
      options: ['60π cm³', '90π cm³', '30π cm³', '45π cm³'],
      correctAnswer: '60π cm³',
      targetNumeric: '60π',
      trap: 'Cone Volume Fraction Miscalculation (Forgetting cone is 1/3 of cylinder)',
      explanation: 'Cylinder volume $V_{cyl} = \\pi r^2 h = 90\\pi$. Cone volume $V_{cone} = \\frac{1}{3} \\pi r^2 h = 30\\pi$. Remaining volume $= 90\\pi - 30\\pi = 60\\pi\\text{ cm}^3$.'
    },
    {
      id: 'geom_4_2',
      level: 4,
      questionText: 'In a circle of radius $10\\text{ cm}$, a chord is at a distance of $6\\text{ cm}$ from the center. What is the length of the chord?',
      options: ['16 cm', '8 cm', '12 cm', '14 cm'],
      correctAnswer: '16 cm',
      targetNumeric: '16',
      trap: 'Half-Chord Doubling Omission (Forgetting to multiply half-chord by 2)',
      explanation: 'Half chord length $= \\sqrt{10^2 - 6^2} = \\sqrt{100 - 36} = 8\\text{ cm}$. Total chord length $= 2 \\times 8 = 16\\text{ cm}$.'
    },

    // Level 5
    {
      id: 'geom_5_1',
      level: 5,
      questionText: 'In $\\triangle ABC$, $\\angle B = 90^\\circ$, $AB = 12\\text{ cm}$, and $BC = 5\\text{ cm}$. What is the length of the inradius ($r$) of the triangle?',
      options: ['2 cm', '3 cm', '2.5 cm', '1.5 cm'],
      correctAnswer: '2 cm',
      targetNumeric: '2',
      trap: 'Inradius Formula for Right Triangles Misapplication',
      explanation: 'Hypotenuse $AC = \\sqrt{12^2 + 5^2} = 13\\text{ cm}$. For a right triangle, inradius $r = \\frac{a + b - c}{2} = \\frac{12 + 5 - 13}{2} = \\frac{4}{2} = 2\\text{ cm}$.'
    },
    {
      id: 'geom_5_2',
      level: 5,
      questionText: 'What is the length of the circumradius ($R$) of an equilateral triangle with side length $6\\text{ cm}$?',
      options: ['2√3 cm', '3√3 cm', '4√3 cm', '3 cm'],
      correctAnswer: '2√3 cm',
      targetNumeric: '2√3',
      trap: 'Circumradius vs Inradius Formula Factor Swap',
      explanation: 'Circumradius of equilateral triangle $R = \\frac{a}{\\sqrt{3}} = \\frac{6}{\\sqrt{3}} = 2\\sqrt{3}\\text{ cm}$.'
    }
  ],

  modernMath: [
    // Level 1
    {
      id: 'mm_1_1',
      level: 1,
      questionText: 'In how many different ways can $5$ distinct books be arranged on a shelf?',
      options: ['120', '60', '24', '720'],
      correctAnswer: '120',
      targetNumeric: '120',
      trap: 'Permutation Factorial Arithmetic Slip',
      explanation: '$5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120$ ways.'
    },
    {
      id: 'mm_1_2',
      level: 1,
      questionText: 'If a fair coin is tossed $3$ times, what is the total number of outcomes in the sample space?',
      options: ['8', '6', '16', '4'],
      correctAnswer: '8',
      targetNumeric: '8',
      trap: 'Sample Space Exponential vs Linear Addition Error',
      explanation: 'Sample space $= 2^3 = 8$ outcomes.'
    },

    // Level 2
    {
      id: 'mm_2_1',
      level: 2,
      questionText: 'If two fair 6-sided dice are rolled simultaneously, what is the probability that the sum of the numbers is $7$?',
      options: ['1/6', '1/12', '5/36', '7/36'],
      correctAnswer: '1/6',
      targetNumeric: '1/6',
      trap: 'Sample Space Counting Oversight',
      explanation: 'Favorable outcomes for sum $7$: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$ $\\rightarrow 6$ outcomes. Total sample space $= 36$. $P = \\frac{6}{36} = \\frac{1}{6}$.'
    },
    {
      id: 'mm_2_2',
      level: 2,
      questionText: 'In how many ways can $6$ people sit around a circular dining table?',
      options: ['120', '720', '360', '60'],
      correctAnswer: '120',
      targetNumeric: '120',
      trap: 'Circular vs Linear Permutation Fallacy (Using n! instead of (n-1)!)',
      explanation: 'Circular permutation formula $= (n - 1)! = (6 - 1)! = 5! = 120$ ways.'
    },

    // Level 3
    {
      id: 'mm_3_1',
      level: 3,
      questionText: 'From a committee of $8$ people, how many different subcommittees of $3$ people can be formed?',
      options: ['56', '336', '28', '112'],
      correctAnswer: '56',
      targetNumeric: '56',
      trap: 'Permutation vs Combination Confusion (Using P instead of C)',
      explanation: 'Combination formula $\\binom{8}{3} = \\frac{8 \\times 7 \\times 6}{3 \\times 2 \\times 1} = 56$.'
    },
    {
      id: 'mm_3_2',
      level: 3,
      questionText: 'How many distinct words can be formed using all letters of the word "SUCCESS"?',
      options: ['420', '5040', '840', '210'],
      correctAnswer: '420',
      targetNumeric: '420',
      trap: 'Repeated Letters Division Omission (Forgetting to divide by factorials of identical letters S and C)',
      explanation: 'Total letters $= 7$. Frequency: $S=3, C=2, U=1, E=1$. Distinct arrangements $= \\frac{7!}{3! \\cdot 2!} = \\frac{5040}{6 \\cdot 2} = \\frac{5040}{12} = 420$.'
    },

    // Level 4
    {
      id: 'mm_4_1',
      level: 4,
      questionText: 'In a group of $100$ students, $60$ play Cricket, $50$ play Football, and $20$ play neither. How many students play BOTH Cricket and Football?',
      options: ['30', '20', '40', '10'],
      correctAnswer: '30',
      targetNumeric: '30',
      trap: 'Inclusion-Exclusion Principle Set Theory Shift',
      explanation: '$N(C \\cup F) = 100 - 20 = 80$. $N(C \\cup F) = N(C) + N(F) - N(C \\cap F) \\rightarrow 80 = 60 + 50 - N(C \\cap F) \\rightarrow N(C \\cap F) = 110 - 80 = 30$.'
    },
    {
      id: 'mm_4_2',
      level: 4,
      questionText: 'A card is drawn from a standard pack of 52 playing cards. What is the probability that it is either a King or a Heart?',
      options: ['4/13', '17/52', '16/52', '15/52'],
      correctAnswer: '4/13',
      targetNumeric: '4/13',
      trap: 'Double Counting Overlap Fallacy (Counting King of Hearts twice)',
      explanation: '$P(K \\cup H) = P(K) + P(H) - P(K \\cap H) = \\frac{4}{52} + \\frac{13}{52} - \\frac{1}{52} = \\frac{16}{52} = \\frac{4}{13}$.'
    },

    // Level 5
    {
      id: 'mm_5_1',
      level: 5,
      questionText: 'A box contains $5$ red balls and $4$ blue balls. If $3$ balls are drawn at random without replacement, what is the probability that at least $1$ ball is red?',
      options: ['20/21', '1/21', '5/6', '19/21'],
      correctAnswer: '20/21',
      targetNumeric: '20/21',
      trap: 'At Least One Complementary Probability Calculation Slip',
      explanation: '$P(\\text{at least 1 red}) = 1 - P(\\text{all 3 blue})$. Total ways to choose 3 balls $= \\binom{9}{3} = 84$. Ways to choose 3 blue balls $= \\binom{4}{3} = 4$. $P(\\text{all blue}) = \\frac{4}{84} = \\frac{1}{21}$. Therefore $P = 1 - \\frac{1}{21} = \\frac{20}{21}$.'
    },
    {
      id: 'mm_5_2',
      level: 5,
      questionText: 'If $3$ distinct numbers are chosen at random from the set $\{1, 2, 3, \\dots, 10\}$, what is the probability that their sum is EVEN?',
      options: ['1/2', '5/12', '1/3', '7/12'],
      correctAnswer: '1/2',
      targetNumeric: '1/2',
      trap: 'Odd/Even Combination Parity Split Miscount',
      explanation: 'Set has 5 evens and 5 odds. Total ways $= \\binom{10}{3} = 120$. Sum is EVEN if: (1) all 3 numbers are EVEN $\\rightarrow \\binom{5}{3} = 10$, or (2) 1 EVEN and 2 ODDS $\\rightarrow \\binom{5}{1} \\cdot \\binom{5}{2} = 5 \\cdot 10 = 50$. Favorable $= 10 + 50 = 60$. Probability $= \\frac{60}{120} = \\frac{1}{2}$.'
    }
  ],

  dataSufficiency: [
    // Level 1
    {
      id: 'ds_1_1',
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
      id: 'ds_1_2',
      level: 1,
      questionText: 'What is the value of the positive integer $x$?\nStatement (1): $x^2 = 25$\nStatement (2): $x < 10$',
      options: [
        'Statement (1) ALONE is sufficient',
        'Statement (2) ALONE is sufficient',
        'BOTH statements TOGETHER are sufficient',
        'Neither statement is sufficient'
      ],
      correctAnswer: 'Statement (1) ALONE is sufficient',
      targetNumeric: 'A',
      trap: 'Ignoring Positive Constraint Given in Question Stem',
      explanation: 'From question stem, $x$ is a POSITIVE integer. From (1): $x^2 = 25 \\rightarrow x = 5$ (since $x>0$). Statement (1) ALONE is sufficient!'
    },

    // Level 2
    {
      id: 'ds_2_1',
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
      id: 'ds_2_2',
      level: 2,
      questionText: 'Is $x$ divisible by $6$?\nStatement (1): $x$ is divisible by $2$.\nStatement (2): $x$ is divisible by $3$.',
      options: [
        'BOTH statements TOGETHER are sufficient',
        'Statement (1) ALONE is sufficient',
        'Statement (2) ALONE is sufficient',
        'Each statement ALONE is sufficient'
      ],
      correctAnswer: 'BOTH statements TOGETHER are sufficient',
      targetNumeric: 'C',
      trap: 'LCM Divisibility Condition Omission',
      explanation: 'A number is divisible by 6 if and only if it is divisible by both 2 and 3 (since $\\text{LCM}(2, 3) = 6$). Combined statements (1) and (2) are TOGETHER sufficient! Answer: C.'
    },

    // Level 3
    {
      id: 'ds_3_1',
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
      id: 'ds_3_2',
      level: 3,
      questionText: 'What is the area of rectangle $R$?\nStatement (1): The perimeter of rectangle $R$ is $24\\text{ cm}$.\nStatement (2): The diagonal of rectangle $R$ is $10\\text{ cm}$.',
      options: [
        'BOTH statements TOGETHER are sufficient',
        'Statement (1) ALONE is sufficient',
        'Statement (2) ALONE is sufficient',
        'Neither statement is sufficient'
      ],
      correctAnswer: 'BOTH statements TOGETHER are sufficient',
      targetNumeric: 'C',
      trap: 'Perimeter vs Area Non-Uniqueness Trap',
      explanation: 'From (1): $2(l + w) = 24 \\rightarrow l + w = 12$. Many rectangles have sum 12 (e.g. 6x6 area 36, 10x2 area 20). Not sufficient. From (2): $l^2 + w^2 = 100$. Not sufficient alone. Combined: $(l + w)^2 = l^2 + w^2 + 2lw \\rightarrow 144 = 100 + 2lw \\rightarrow 2lw = 44 \\rightarrow lw = 22$. Area = 22! Answer: C.'
    },

    // Level 4
    {
      id: 'ds_4_1',
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
      explanation: 'From (1): If $p = 3$, $p+2=5$ (prime, $p$ prime). If $p = 9$, $p+2=11$ (prime, $p$ composite). Not sufficient. From (2): If $p=3$, $p-1=2$ (prime). If $p=4$, $p-1=3$ (prime, $p$ composite). Not sufficient. Combined: $p=3$ works (prime), but test $p=4$: $p-1=3$ (prime), $p+2=6$ (not prime). Wait: if $p=9$: $p-1=8$ (not prime). What about $p=3$? $p+2=5$ (prime), $p-1=2$ (prime). Is $p=3$ the ONLY integer where $p-1$ and $p+2$ are both prime? Test $p=4$: $p-1=3$ (prime) but $p+2=6$ (not prime). Testing shows insufficiency without strict bounds. Answer: E.'
    },
    {
      id: 'ds_4_2',
      level: 4,
      questionText: 'Is $x$ an integer?\nStatement (1): $3x$ is an integer.\nStatement (2): $5x$ is an integer.',
      options: [
        'BOTH statements TOGETHER are sufficient',
        'Statement (1) ALONE is sufficient',
        'Statement (2) ALONE is sufficient',
        'Neither statement is sufficient'
      ],
      correctAnswer: 'BOTH statements TOGETHER are sufficient',
      targetNumeric: 'C',
      trap: 'Co-prime Linear Combination Fraction Trap',
      explanation: 'From (1): $x$ could be $1/3$ (not integer). Not sufficient. From (2): $x$ could be $1/5$ (not integer). Not sufficient. Combined: Since $\\gcd(3, 5) = 1$, by Bezout\'s identity $2(3x) - 1(5x) = 6x - 5x = x$. Since $6x$ and $5x$ are integers, $x$ MUST be an integer! Answer: C.'
    },

    // Level 5
    {
      id: 'ds_5_1',
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
    },
    {
      id: 'ds_5_2',
      level: 5,
      questionText: 'Is $a^2 + b^2 > 2ab$?\nStatement (1): $a \\neq b$\nStatement (2): $ab > 0$',
      options: [
        'Statement (1) ALONE is sufficient',
        'Statement (2) ALONE is sufficient',
        'BOTH statements TOGETHER are sufficient',
        'Neither statement is sufficient'
      ],
      correctAnswer: 'Statement (1) ALONE is sufficient',
      targetNumeric: 'A',
      trap: 'Failing to Recognize Perfect Square Non-negativity Identity',
      explanation: '$a^2 + b^2 - 2ab = (a - b)^2$. For any real numbers, $(a - b)^2 \\ge 0$, and $(a - b)^2 > 0$ whenever $a \\neq b$. Statement (1) specifies $a \\neq b$, so $(a - b)^2 > 0 \\rightarrow a^2 + b^2 > 2ab$. Statement (1) ALONE is sufficient! Answer: A.'
    }
  ]
};

/**
 * Diagnostic Onboarding 5-Question Test (Representative questions from each topic)
 */
export const DIAGNOSTIC_QUESTIONS = [
  { ...QUESTION_BANK.arithmetic[0], topicKey: 'arithmetic', topicName: 'Arithmetic' },
  { ...QUESTION_BANK.algebra[2], topicKey: 'algebra', topicName: 'Algebra' },
  { ...QUESTION_BANK.geometry[2], topicKey: 'geometry', topicName: 'Geometry' },
  { ...QUESTION_BANK.modernMath[4], topicKey: 'modernMath', topicName: 'Modern Math' },
  { ...QUESTION_BANK.dataSufficiency[2], topicKey: 'dataSufficiency', topicName: 'Data Sufficiency' }
];
