import type { Course } from "@/types/content";

export const courses: Course[] = [
  {
    id: "beginner-001",
    slug: "excel-basics",
    title: "Excel Basics - Getting Started",
    description: "Learn the fundamentals of Microsoft Excel including interface navigation, basic data entry, and your first formulas. Perfect for complete beginners.",
    level: "beginner",
    totalDuration: 120,
    totalLessons: 8,
    lessons: [
      {
        id: "beginner-001-01",
        slug: "excel-interface-overview",
        title: "The Excel Interface",
        description: "Navigate the Excel interface with confidence",
        duration: 15,
        order: 1,
        type: "theory",
        objectives: [
          "Identify the main components of the Excel interface",
          "Navigate between worksheets and workbooks",
          "Understand the Ribbon and its organization",
          "Use the Quick Access Toolbar effectively",
        ],
        content: {
          sections: [
            {
              id: "intro-excel",
              title: "What is Microsoft Excel?",
              content: `Microsoft Excel is a powerful spreadsheet application that allows you to organize, analyze, and visualize data. It's part of the Microsoft Office suite and is used by millions of people worldwide for tasks ranging from simple budgeting to complex financial analysis.

Excel uses a grid system of rows and columns to organize data. Each intersection of a row and column is called a cell, and each cell can contain text, numbers, formulas, or other data.`,
            },
            {
              id: "interface-components",
              title: "Key Interface Components",
              content: `The Excel interface consists of several important components:

**Title Bar**: Shows the name of your workbook and provides access to minimize, maximize, and close buttons.

**Ribbon**: The strip of tabs at the top containing all of Excel's commands organized into tabs (Home, Insert, Page Layout, etc.).

**Formula Bar**: Displays the content of the selected cell. You can also edit cell content directly here.

**Worksheet Area**: The main grid where you enter and view data. Each worksheet contains over 17 billion cells (16,384 columns × 1,048,576 rows).

**Sheet Tabs**: Located at the bottom, these allow you to switch between different worksheets in your workbook.

**Status Bar**: Shows information about the current state, such as the sum of selected cells or the current zoom level.`,
            },
            {
              id: "ribbon-tabs",
              title: "Understanding the Ribbon",
              content: `The Ribbon is organized into tabs, each containing related commands:

**Home**: The most commonly used tab, containing clipboard operations, font formatting, alignment options, number formatting, and basic editing tools.

**Insert**: Commands for adding charts, tables, illustrations, links, and other objects to your worksheet.

**Page Layout**: Options for print setup, page arrangement, and theme customization.

**Formulas**: Access to the function library, named ranges, and formula auditing tools.

**Data**: Tools for working with external data, queries, and data connections.

**Review**: Proofing tools, comments, and sheet protection options.

**View**: Display options, zoom controls, and window arrangement tools.`,
            },
          ],
          examples: [
            {
              id: "ex-001",
              title: "Identifying Interface Elements",
              description: "Look at an Excel window and identify: the Ribbon, Formula Bar, active cell, sheet tabs, and status bar.",
              data: {},
              explanation: "The ability to quickly identify these elements will help you navigate Excel more efficiently.",
            },
          ],
          summary: "The Excel interface consists of the Title Bar, Ribbon, Formula Bar, worksheet grid, sheet tabs, and status bar. The Ribbon organizes all of Excel's commands into logical tabs. Understanding these components is essential for working effectively in Excel.",
          furtherReading: [
            { title: "Microsoft Excel Official Documentation", url: "https://support.microsoft.com/excel", type: "documentation" },
            { title: "Excel Interface Overview Video", url: "https://youtube.com/watch?v=excel-basics", type: "video" },
          ],
        },
      },
      {
        id: "beginner-001-02",
        slug: "navigating-cells",
        title: "Navigating Cells and Ranges",
        description: "Master the techniques for moving around your spreadsheet efficiently",
        duration: 15,
        order: 2,
        type: "theory",
        objectives: [
          "Use keyboard shortcuts for quick navigation",
          "Select single cells and ranges of cells",
          "Navigate to specific cells using Go To",
          "Select entire rows, columns, and worksheets",
        ],
        content: {
          sections: [
            {
              id: "cell-selection",
              title: "Selecting Cells",
              content: `Clicking a cell makes it the active cell. The active cell has a dark border and its address appears in the Name Box. You can also click and drag to select a range of cells, or hold Ctrl while clicking to select multiple non-adjacent cells.

For large data ranges, click one corner of the range, hold Shift, and click the opposite corner. This is much faster than dragging across hundreds of rows.`,
            },
            {
              id: "keyboard-navigation",
              title: "Keyboard Navigation",
              content: `Excel offers numerous keyboard shortcuts for navigation:

- **Arrow Keys**: Move one cell in the direction of the arrow
- **Tab**: Move one cell to the right
- **Enter**: Move down one cell (configurable direction)
- **Ctrl + Home**: Go to cell A1
- **Ctrl + End**: Go to the last used cell
- **Ctrl + Arrow**: Jump to the edge of the data region
- **Page Up/Down**: Move one screen up or down
- **Ctrl + Page Up/Down**: Switch between worksheets`,
            },
            {
              id: "go-to-feature",
              title: "The Go To Feature",
              content: `Press F5 or Ctrl+G to open the Go To dialog. This allows you to:
- Jump directly to a specific cell address
- Navigate to named ranges
- Find cells with specific characteristics (constants, formulas, etc.)

This is especially useful in large spreadsheets where scrolling would be time-consuming.`,
            },
          ],
          summary: "Efficient navigation in Excel involves using keyboard shortcuts, understanding selection techniques, and leveraging features like Go To. Practice these techniques to dramatically improve your spreadsheet speed.",
          furtherReading: [
            { title: "Excel Keyboard Shortcuts Reference", url: "https://support.microsoft.com/keyboard-shortcuts", type: "documentation" },
          ],
        },
      },
      {
        id: "beginner-001-03",
        slug: "data-entry-basics",
        title: "Basic Data Entry",
        description: "Learn how to enter and edit different types of data in Excel",
        duration: 20,
        order: 3,
        type: "practical",
        objectives: [
          "Enter text, numbers, and dates into cells",
          "Use Tab and Enter to move between cells",
          "Edit existing cell content",
          "Use AutoFill to extend data patterns",
        ],
        content: {
          sections: [
            {
              id: "data-types",
              title: "Types of Data in Excel",
              content: `Excel recognizes several data types:

**Text**: Letters, numbers, and symbols treated as text. Text is left-aligned by default. If a number needs to be displayed exactly as entered (like a phone number), prepend it with an apostrophe (').

**Numbers**: Can include decimals, negative numbers, and scientific notation. Numbers are right-aligned by default.

**Dates**: Excel stores dates as serial numbers (days since January 1, 1900). You can format dates in many ways, but underlying values remain consistent for calculations.

**Times**: Similar to dates, stored as decimal fractions of a 24-hour day.

**Boolean Values**: TRUE and FALSE values, useful in logical formulas.

**Formulas**: Begin with = and calculate values dynamically.`,
            },
            {
              id: "entry-techniques",
              title: "Data Entry Techniques",
              content: `When entering data:

1. Click a cell or use arrow keys to select it
2. Type your data - it appears in both the cell and the Formula Bar
3. Press Enter to confirm and move down, or Tab to confirm and move right
4. To edit, double-click the cell or press F2

**Tips for efficient entry:**
- Press Tab instead of Enter to move right after entry
- Use Alt + Enter to create line breaks within a cell
- Press Escape to cancel entry and keep original content
- Press Ctrl + ; to insert today's date
- Use Ctrl + D to fill down from the cell above`,
            },
            {
              id: "autofill",
              title: "AutoFill Feature",
              content: `AutoFill extends patterns automatically. If you enter "January" in a cell and drag the fill handle (small square at cell corner), Excel continues "February," "March," etc. AutoFill recognizes:

- Number sequences (1, 2, 3...)
- Date sequences (Mon, Tue, Wed...)
- Repeated values
- Custom lists (found in Excel Options)

You can also AutoFill formulas - Excel adjusts cell references automatically for each row or column.`,
            },
          ],
          examples: [
            {
              id: "ex-entry-01",
              title: "Creating a Date Series",
              description: "Enter 1/1/2024 in cell A1, then use AutoFill to create dates through 1/7/2024.",
              data: {},
              explanation: "Excel recognizes date patterns and automatically increments by one day.",
            },
            {
              id: "ex-entry-02",
              title: "Creating a Number Pattern",
              description: "Enter 1 in A1 and 3 in A2, select both, and AutoFill down to create odd numbers.",
              data: {},
              explanation: "When you select multiple cells, Excel identifies the increment pattern (2 in this case) and continues it.",
            },
          ],
          exercises: [
            {
              id: "ex-001",
              title: "Practice Data Entry",
              description: "Create a simple budget list with categories in column A and amounts in column B. Include at least 5 categories with different amounts.",
              instructions: [
                "Click cell A1 and type 'Category'",
                "Click cell B1 and type 'Amount'",
                "Enter 5 expense categories in A2:A6",
                "Enter corresponding amounts in B2:B6",
                "Format the amounts as currency",
              ],
              hints: [
                "Use AutoSum to verify your total",
                "Try different number formats to see the difference",
              ],
            },
          ],
          summary: "Excel supports text, numbers, dates, times, and formulas as data types. Efficient data entry uses Tab/Enter navigation, AutoFill for patterns, and keyboard shortcuts for common tasks.",
          furtherReading: [
            { title: "Enter and format data in Excel", url: "https://support.microsoft.com/format-data", type: "documentation" },
          ],
        },
      },
      {
        id: "beginner-001-04",
        slug: "your-first-formulas",
        title: "Your First Formulas",
        description: "Create basic mathematical formulas in Excel",
        duration: 20,
        order: 4,
        type: "practical",
        objectives: [
          "Understand formula syntax and structure",
          "Create addition, subtraction, multiplication, and division formulas",
          "Use cell references in formulas",
          "Copy formulas to other cells",
        ],
        content: {
          sections: [
            {
              id: "formula-basics",
              title: "Formula Fundamentals",
              content: `All Excel formulas begin with an equals sign (=). A formula can contain:

- **Cell references**: A1, B2, C3 (addresses of cells with values)
- **Operators**: + (add), - (subtract), * (multiply), / (divide), ^ (power)
- **Numbers**: Literal values like 100 or 3.14
- **Functions**: Built-in calculations like SUM, AVERAGE

Example formulas:
- =A1+B1 (adds values in A1 and B1)
- =A1*10 (multiplies A1 by 10)
- =SUM(A1:A10) (adds all values from A1 through A10)

**Order of Operations**: Excel follows PEMDAS - Parentheses, Exponents, Multiplication/Division, Addition/Subtraction. Use parentheses to control calculation order.`,
            },
            {
              id: "cell-references",
              title: "Using Cell References",
              content: `Cell references make formulas dynamic. Instead of =10+20, use =A1+B1. When the values in A1 or B1 change, the formula result updates automatically.

**Types of References:**
- **Relative** (A1): Adjusts when copied (A1 becomes B1 when copied right)
- **Absolute** ($A$1): Stays fixed when copied (always refers to A1)
- **Mixed** ($A1 or A$1): One part fixed, one adjustable

Press F4 while typing a reference to cycle through reference types.`,
            },
            {
              id: "copying-formulas",
              title: "Copying Formulas",
              content: `When you copy a formula, Excel automatically adjusts the references. If you copy =A1+B1 from C1 to C2, it becomes =A2+B2.

This is called relative referencing and is one of Excel's most powerful features. It allows you to create one formula and apply it to hundreds of rows or columns.

To copy: Select the cell, Ctrl+C, select destination, Ctrl+V.
Or drag the fill handle (small square at cell corner) to extend.`,
            },
          ],
          examples: [
            {
              id: "ex-formula-01",
              title: "Basic Addition",
              description: "Enter 100 in A1, 200 in B1, and =A1+B1 in C1. The result should be 300.",
              data: {},
              explanation: "The formula adds the values from A1 and B1. If you change either value, C1 updates automatically.",
            },
            {
              id: "ex-formula-02",
              title: "Percentage Calculation",
              description: "Calculate 15% of a value in A1 using =A1*15% or =A1*0.15",
              data: {},
              explanation: "In Excel, 15% equals 0.15. Both formulas produce the same result.",
            },
          ],
          exercises: [
            {
              id: "ex-formula-001",
              title: "Create a Simple Calculator",
              description: "Build a worksheet that calculates the total, tax, and grand total for a purchase.",
              instructions: [
                "In A1, type 'Subtotal'",
                "In B1, enter 1000",
                "In A2, type 'Tax (8%)'",
                "In B2, enter =B1*0.08",
                "In A3, type 'Total'",
                "In B3, enter =B1+B2",
                "Try changing the subtotal to see all values update",
              ],
            },
          ],
          summary: "Formulas in Excel begin with = and can include cell references, operators, numbers, and functions. Relative references adjust when copied, while absolute references stay fixed. This makes formulas powerful and flexible.",
          furtherReading: [
            { title: "Excel formulas overview", url: "https://support.microsoft.com/formulas", type: "documentation" },
          ],
        },
        quiz: {
          id: "quiz-001",
          title: "Formula Basics Quiz",
          passingScore: 70,
          questions: [
            {
              id: "q1",
              type: "multiple-choice",
              question: "What must every Excel formula begin with?",
              options: ["+", "=", "SUM", "()"],
              correctAnswer: "=",
              explanation: "All Excel formulas must start with an equals sign (=) to distinguish them from regular text.",
              points: 10,
            },
            {
              id: "q2",
              type: "multiple-choice",
              question: "If you copy a formula with relative references from cell A1 to B1, what happens?",
              options: [
                "The formula stays exactly the same",
                "Column letters increase by 1",
                "Row numbers increase by 1",
                "The formula breaks",
              ],
              correctAnswer: "Column letters increase by 1",
              explanation: "Relative references adjust when copied. A1 becomes B1 (column changes), and row references would adjust similarly.",
              points: 10,
            },
            {
              id: "q3",
              type: "true-false",
              question: "Pressing F4 while creating a formula cycles through reference types.",
              correctAnswer: "True",
              explanation: "F4 toggles between relative ($A$1), absolute ($A1), and mixed (A$1) references.",
              points: 10,
            },
            {
              id: "q4",
              type: "multiple-choice",
              question: "What is the result of =10+5*2?",
              options: ["30", "20", "25", "15"],
              correctAnswer: "20",
              explanation: "Following order of operations: 5*2=10, then 10+10=20. Multiplication happens before addition.",
              points: 10,
            },
            {
              id: "q5",
              type: "fill-blank",
              question: "To add all values from A1 through A10, use the formula =SUM(___)",
              correctAnswer: "A1:A10",
              explanation: "A1:A10 is the range notation meaning from A1 to A10 inclusive.",
              points: 10,
            },
          ],
        },
      },
      {
        id: "beginner-001-05",
        slug: "basic-formatting",
        title: "Basic Cell Formatting",
        description: "Make your spreadsheets visually appealing and easier to read",
        duration: 15,
        order: 5,
        type: "practical",
        objectives: [
          "Apply font formatting (bold, italic, size)",
          "Change text and background colors",
          "Add borders and shading",
          "Align cell contents",
        ],
        content: {
          sections: [
            {
              id: "font-formatting",
              title: "Font Formatting",
              content: `The Home tab's Font group contains formatting options:

**Font**: Choose the typeface (Arial, Calibri, etc.)
**Font Size**: Adjust text size (8-72 points typically)
**Bold (Ctrl+B)**: Makes text thicker
**Italic (Ctrl+I)**: Slants text slightly
**Underline (Ctrl+U)**: Adds line under text
**Font Color**: Changes text color

For headers and important values, use Bold. For large datasets, keep font sizes smaller (10-11pt) to fit more data.`,
            },
            {
              id: "fill-borders",
              title: "Fill Color and Borders",
              content: `**Fill Color**: Background shading for cells. Use light colors to avoid straining eyes.

**Borders**: Lines around cells to create tables and structure. Options include:
- All Borders: Lines between every cell
- Outside Borders: Only the perimeter
- Thick Box Border: Heavy outline

**Best Practices:**
- Use borders sparingly for clarity
- Light fill colors for header rows
- Consistent formatting throughout`,
            },
            {
              id: "alignment",
              title: "Cell Alignment",
              content: `**Horizontal Alignment:**
- Left: Default for text
- Center: Good for headers
- Right: Default for numbers

**Vertical Alignment:**
- Top, Center, Bottom: Position text vertically

**Wrap Text**: Shows all text within the cell width

**Merge & Center**: Combines cells for titles (use sparingly)

Consistent alignment makes spreadsheets professional and easier to scan.`,
            },
          ],
          summary: "Basic formatting includes font styling, colors, borders, and alignment. Consistent formatting improves readability and professionalism. Use the formatting tools on the Home tab.",
          furtherReading: [
            { title: "Format cells in Excel", url: "https://support.microsoft.com/format-cells", type: "documentation" },
          ],
        },
      },
      {
        id: "beginner-001-06",
        slug: "number-formatting",
        title: "Number Formatting",
        description: "Display numbers as currency, percentages, dates, and more",
        duration: 15,
        order: 6,
        type: "theory",
        objectives: [
          "Apply currency and accounting formats",
          "Format numbers as percentages",
          "Change decimal places",
          "Create custom number formats",
        ],
        content: {
          sections: [
            {
              id: "number-types",
              title: "Common Number Formats",
              content: `**General**: Default format, no specific display rules
**Number**: Shows decimals with thousands separator
**Currency**: Includes currency symbol ($), placed before number
**Accounting**: Currency symbol aligned, zeros become dashes
**Percentage**: Multiplies by 100 and adds % sign
**Scientific**: Displays as power of 10 (e.g., 1.23E+05)
**Fraction**: Shows as fraction (e.g., 1/4)
**Date/Time**: Various date and time formats

The format doesn't change the underlying value—only how it displays.`,
            },
            {
              id: "quick-formatting",
              title: "Quick Number Formatting",
              content: `On the Home tab, the Number group provides quick access:

- **Accounting Number Format**: Click the dollar sign
- **Percent Style**: Click the percent symbol
- **Comma Style**: Click the comma
- **Increase/Decrease Decimal**: Control decimal places

Keyboard shortcuts:
- Ctrl+Shift+$ : Currency format
- Ctrl+Shift+% : Percentage format
- Ctrl+Shift+! : Number format with commas`,
            },
          ],
          examples: [
            {
              id: "ex-number-01",
              title: "Currency vs Accounting",
              description: "Enter 1234.56 in two cells. Apply Currency format to one and Accounting to the other.",
              data: {},
              explanation: "Currency shows $1,234.56 while Accounting aligns the symbol differently and may show -$1,234.56 for negatives.",
            },
          ],
          summary: "Number formatting controls how values display without changing the underlying data. Use Currency for general money values, Accounting for financial statements, and Percentage for rates.",
          furtherReading: [
            { title: "Number formats in Excel", url: "https://support.microsoft.com/number-format", type: "documentation" },
          ],
        },
      },
      {
        id: "beginner-001-07",
        slug: "working-with-worksheets",
        title: "Working with Worksheets",
        description: "Manage multiple worksheets, rename them, and organize your workbook",
        duration: 10,
        order: 7,
        type: "theory",
        objectives: [
          "Add, delete, and rename worksheets",
          "Move and copy worksheets",
          "Navigate between worksheets",
          "Color-code sheet tabs",
        ],
        content: {
          sections: [
            {
              id: "sheet-management",
              title: "Managing Worksheets",
              content: `**Adding a Worksheet:**
- Click the + button next to sheet tabs
- Press Shift+F11
- Right-click a tab and select Insert

**Deleting a Worksheet:**
- Right-click the tab and select Delete
- Or click the X on the tab (if visible)

**Renaming:**
- Double-click the tab name
- Or right-click and select Rename
- Names can be up to 31 characters

**Moving/Copying:**
- Drag the tab to reposition
- Hold Ctrl while dragging to copy
- Right-click > Move or Copy for more options`,
            },
            {
              id: "sheet-navigation",
              title: "Navigating Sheets",
              content: `**Quick Navigation:**
- Click sheet tabs at the bottom
- Ctrl+Page Up/Down to cycle through sheets
- Right-click navigation arrows for a list

**Organizing Large Workbooks:**
- Color-code tabs by department or type
- Group related sheets together
- Use descriptive names
- Keep similar structure across sheets`,
            },
          ],
          summary: "Worksheets are tabs within your workbook. You can add, delete, rename, move, and copy worksheets. Use Ctrl+Page Up/Down to navigate between sheets quickly.",
          furtherReading: [
            { title: "Work with multiple worksheets", url: "https://support.microsoft.com/worksheets", type: "documentation" },
          ],
        },
      },
      {
        id: "beginner-001-08",
        slug: "printing-basics",
        title: "Printing Basics",
        description: "Learn how to print your worksheets and configure print settings",
        duration: 10,
        order: 8,
        type: "theory",
        objectives: [
          "Preview and print worksheets",
          "Set print area and page breaks",
          "Configure page layout options",
          "Print headers and titles",
        ],
        content: {
          sections: [
            {
              id: "print-preview",
              title: "Print Preview and Setup",
              content: `Press Ctrl+P to open the Print pane. You'll see:
- Preview of your document
- Printer selection
- Print settings
- Page layout options

**Page Layout Tab Options:**
- Orientation: Portrait or Landscape
- Paper Size: Letter, A4, etc.
- Margins: Normal, Wide, Narrow, Custom
- Scale: Fit to page, percentage adjustment`,
            },
            {
              id: "print-area",
              title: "Setting Print Area",
              content: `**Print Area:**
- Select cells, then File > Print > Print Area > Set Print Area
- Only the defined area prints

**Repeat Titles:**
- Page Layout > Print Titles
- Select rows to repeat at top of each page
- Essential for multi-page reports with headers

**Page Breaks:**
- Insert > Page Break
- View > Page Break Preview to see and adjust breaks`,
            },
          ],
          summary: "Excel's print features allow you to configure orientation, margins, paper size, print area, and repeat headers. Always preview before printing to save paper.",
          furtherReading: [
            { title: "Print a worksheet", url: "https://support.microsoft.com/print", type: "documentation" },
          ],
        },
      },
    ],
  },
  {
    id: "intermediate-001",
    slug: "intermediate-formulas",
    title: "Intermediate Formulas & Functions",
    description: "Expand your formula skills with conditional logic, lookup functions, and more powerful calculations.",
    level: "intermediate",
    totalDuration: 180,
    totalLessons: 10,
    lessons: [
      {
        id: "intermediate-001-01",
        slug: "using-functions",
        title: "Using Functions Effectively",
        description: "Learn to use Excel's built-in functions for common calculations",
        duration: 20,
        order: 1,
        type: "theory",
        objectives: [
          "Understand function syntax and arguments",
          "Use the Function Library on the Formulas tab",
          "Nest functions within other functions",
          "Use the Insert Function dialog",
        ],
        content: {
          sections: [
            {
              id: "function-anatomy",
              title: "Function Anatomy",
              content: `A function has three components:
1. **Name**: Identifies what the function does (SUM, AVERAGE, VLOOKUP)
2. **Parentheses**: Contains the arguments
3. **Arguments**: The inputs the function needs

Example: =SUM(A1:A10)
- SUM is the function name
- A1:A10 is the argument (the range to sum)

**Argument Types:**
- Required arguments must be provided
- Optional arguments have default values
- Arguments can be numbers, text, cell references, ranges, or other functions`,
            },
            {
              id: "function-library",
              title: "The Function Library",
              content: `The Formulas tab organizes functions by category:

**AutoSum**: Quick access to SUM, AVERAGE, COUNT, MAX, MIN
**Recently Used**: Your frequently used functions
**Financial**: PMT, FV, NPV, IRR, etc.
**Logical**: IF, AND, OR, NOT, IFERROR, IFS
**Text**: LEFT, RIGHT, MID, CONCATENATE, TRIM
**Date & Time**: TODAY, NOW, DATEDIF, NETWORKDAYS
**Lookup & Reference**: VLOOKUP, HLOOKUP, INDEX, MATCH
**Math & Trig**: SUM, ROUND, ABS, SQRT, etc.

Click a category to see available functions.`,
            },
            {
              id: "nesting-functions",
              title: "Nesting Functions",
              content: `You can use the result of one function as an argument to another:

=ROUND(AVERAGE(A1:A10), 2)

This calculates the average, then rounds it to 2 decimal places.

**Rules for nesting:**
- Start with = for the outermost function
- Each opening parenthesis needs a closing one
- Excel will highlight matching parentheses as you type
- Test complex formulas step by step

**Common nesting patterns:**
- IF with AND/OR for complex conditions
- VLOOKUP with IFERROR for error handling
- ROUND with any calculation`,
            },
          ],
          examples: [
            {
              id: "ex-nest-01",
              title: "Nesting IF and ISBLANK",
              description: "=IF(ISBLANK(A1), \"No Data\", A1*2)",
              data: {},
              explanation: "Checks if A1 is blank; if so displays 'No Data', otherwise multiplies by 2.",
            },
          ],
          summary: "Functions are powerful building blocks. Understanding syntax, using the Function Library, and nesting functions enable complex calculations.",
          furtherReading: [
            { title: "Excel function reference", url: "https://support.microsoft.com/functions", type: "documentation" },
          ],
        },
        quiz: {
          id: "quiz-002",
          title: "Functions Quiz",
          passingScore: 70,
          questions: [
            {
              id: "q1",
              type: "multiple-choice",
              question: "In the function =SUM(A1:A10), what is 'A1:A10' called?",
              options: ["Name", "Argument", "Operator", "Result"],
              correctAnswer: "Argument",
              explanation: "Arguments are the inputs a function needs to perform its calculation.",
              points: 10,
            },
            {
              id: "q2",
              type: "true-false",
              question: "You can nest up to 64 IF functions in Excel.",
              correctAnswer: "True",
              explanation: "While technically possible, nesting more than a few IFs makes formulas hard to read. Consider IFS or other approaches.",
              points: 10,
            },
          ],
        },
      },
      {
        id: "intermediate-001-02",
        slug: "sumif-averageif",
        title: "SUMIF and COUNTIF Functions",
        description: "Perform calculations based on conditions",
        duration: 20,
        order: 2,
        type: "practical",
        objectives: [
          "Use SUMIF to sum values meeting criteria",
          "Use COUNTIF to count cells with conditions",
          "Apply wildcards in criteria",
          "Use multiple criteria with SUMIFS/COUNTIFS",
        ],
        content: {
          sections: [
            {
              id: "sumif-basics",
              title: "SUMIF Function",
              content: `SUMIF adds values that meet a specific condition:

=SUMIF(range, criteria, [sum_range])

- **range**: The cells to evaluate (where to look)
- **criteria**: The condition (what to find)
- **sum_range**: The cells to sum (what to add)

Example: =SUMIF(A:A, "North", B:B)
- Looks in column A for "North"
- Sums corresponding values in column B

**Criteria examples:**
- "North" - exact match
- ">100" - greater than 100
- "<>" - not empty
- "???" - 3 character words`,
            },
            {
              id: "countif-basics",
              title: "COUNTIF Function",
              content: `COUNTIF counts cells that meet a condition:

=COUNTIF(range, criteria)

Example: =COUNTIF(A:A, ">0")
- Counts all cells in column A greater than 0

Common uses:
- Count non-blank cells: =COUNTIF(A:A, "<>")
- Count specific text: =COUNTIF(A:A, "Complete")
- Count duplicates: Compare count to total`,
            },
            {
              id: "multiple-criteria",
              title: "Multiple Criteria with SUMIFS/COUNTIFS",
              content: `For multiple conditions, use SUMIFS (sum) or COUNTIFS (count):

=SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2, ...)

Example: =SUMIFS(C:C, A:A, "North", B:B, ">1000")
- Sums column C
- Where column A is "North" AND column B > 1000

**Order matters:** Each criteria_range must match in size to sum_range.`,
            },
          ],
          exercises: [
            {
              id: "ex-sumif-001",
              title: "Sales Analysis",
              description: "Create formulas to analyze sales data by region and amount.",
              instructions: [
                "Set up columns for Region, Product, and Sales",
                "Use SUMIF to total sales for 'North' region",
                "Use COUNTIF to count orders over $500",
                "Use SUMIFS to sum sales for 'South' region over $1000",
              ],
            },
          ],
          summary: "SUMIF and COUNTIF perform calculations based on conditions. SUMIFS and COUNTIFS handle multiple criteria for more complex analysis.",
          furtherReading: [
            { title: "COUNTIF function", url: "https://support.microsoft.com/countif", type: "documentation" },
          ],
        },
      },
      {
        id: "intermediate-001-03",
        slug: "lookup-functions",
        title: "Lookup Functions (VLOOKUP & INDEX/MATCH)",
        description: "Find and retrieve data from tables",
        duration: 25,
        order: 3,
        type: "practical",
        objectives: [
          "Use VLOOKUP to find values in tables",
          "Understand VLOOKUP limitations",
          "Use INDEX/MATCH for more flexible lookups",
          "Handle errors with IFERROR",
        ],
        content: {
          sections: [
            {
              id: "vlookup-basics",
              title: "VLOOKUP Function",
              content: `VLOOKUP searches for a value in the first column and returns a value from another column:

=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])

- **lookup_value**: What to search for
- **table_array**: The range containing the data
- **col_index_num**: Which column to return (1 = first column)
- **range_lookup**: TRUE for approximate match, FALSE for exact

Example: =VLOOKUP(A2, Products!A:C, 2, FALSE)
- Looks up value in A2
- Searches in Products sheet, columns A through C
- Returns value from column 2 (the second column)
- Requires exact match`,
            },
            {
              id: "vlookup-limitations",
              title: "VLOOKUP Limitations",
              content: `VLOOKUP has important limitations:

1. **Can only look right**: Lookup column must be leftmost
2. **Column index**: If you insert/delete columns, index numbers break
3. **Slow on large data**: Scans from top each time

**When VLOOKUP fails:**
- #N/A: Value not found (use IFERROR or IFNA)
- #REF!: Column index too high
- Wrong results: Forgot FALSE for exact match`,
            },
            {
              id: "index-match",
              title: "INDEX/MATCH - The Professional Choice",
              content: `INDEX/MATCH is more flexible than VLOOKUP:

=INDEX(return_range, MATCH(lookup_value, lookup_range, match_type))

Benefits:
- Can return values from ANY column
- Columns can be inserted without breaking
- Can look up based on any column (not just first)
- More efficient on large datasets

Example: =INDEX(B:B, MATCH(A2, C:C, 0))
- Returns value from column B
- Where column C matches A2
- 0 = exact match`,
            },
            {
              id: "iferror",
              title: "Handling Errors with IFERROR",
              content: `When lookups don't find matches, they return #N/A. Wrap in IFERROR to provide alternatives:

=IFERROR(VLOOKUP(...), "Not Found")
=IFERROR(VLOOKUP(...), 0)
=IFERROR(VLOOKUP(...), "")

This prevents error values from appearing in your results and keeps reports clean.`,
            },
          ],
          examples: [
            {
              id: "ex-vlookup-01",
              title: "Employee Lookup",
              description: "Create a formula that looks up an employee ID and returns their name, department, and salary.",
              data: {},
              explanation: "Use VLOOKUP with a helper table, or INDEX/MATCH for more flexibility.",
            },
          ],
          exercises: [
            {
              id: "ex-lookup-001",
              title: "Build a Product Catalog",
              description: "Create a product lookup system that retrieves details based on product code.",
              instructions: [
                "Create a Products table with ID, Name, Price, Stock columns",
                "Create an Order form with Product ID input",
                "Use VLOOKUP to auto-fill product details",
                "Add IFERROR for invalid product codes",
              ],
            },
          ],
          summary: "VLOOKUP finds values in tables but has limitations. INDEX/MATCH is more flexible and professional. Always use IFERROR to handle missing values gracefully.",
          furtherReading: [
            { title: "VLOOKUP function", url: "https://support.microsoft.com/vlookup", type: "documentation" },
            { title: "INDEX and MATCH together", url: "https://support.microsoft.com/index-match", type: "documentation" },
          ],
        },
        quiz: {
          id: "quiz-003",
          title: "Lookup Functions Quiz",
          passingScore: 70,
          questions: [
            {
              id: "q1",
              type: "multiple-choice",
              question: "What does the col_index_num argument in VLOOKUP represent?",
              options: [
                "The column letter",
                "The position of the column in the table (1 = first)",
                "The number of columns to return",
                "The column of the lookup value",
              ],
              correctAnswer: "The position of the column in the table (1 = first)",
              explanation: "col_index_num starts at 1 for the first column of your table_array, not 0.",
              points: 10,
            },
            {
              id: "q2",
              type: "true-false",
              question: "VLOOKUP can return values from columns to the LEFT of the lookup column.",
              correctAnswer: "False",
              explanation: "This is VLOOKUP's main limitation. Use INDEX/MATCH to look left.",
              points: 10,
            },
            {
              id: "q3",
              type: "multiple-choice",
              question: "What does IFERROR return if the wrapped formula produces an error?",
              options: [
                "#N/A",
                "The error code",
                "The value you specify as the second argument",
                "TRUE",
              ],
              correctAnswer: "The value you specify as the second argument",
              explanation: "IFERROR takes two arguments: the formula to test and the value to return if it errors.",
              points: 10,
            },
          ],
        },
      },
    ],
  },
];

export const curriculumLevels = [
  {
    id: "beginner",
    name: "Beginner",
    description: "Start your Excel journey with foundational skills",
    icon: "Baby",
    color: "#22C55E",
    courses: 2,
  },
  {
    id: "intermediate",
    name: "Intermediate",
    description: "Build on your foundation with powerful formulas and features",
    icon: "TrendingUp",
    color: "#3B82F6",
    courses: 3,
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Master complex functions, analysis, and Power tools",
    icon: "Zap",
    color: "#8B5CF6",
    courses: 3,
  },
  {
    id: "expert",
    name: "Expert",
    description: "Become a power user with PivotTables and data analysis",
    icon: "Star",
    color: "#F97316",
    courses: 3,
  },
  {
    id: "professional",
    name: "Professional",
    description: "Industry-ready skills for business and finance",
    icon: "Briefcase",
    color: "#EF4444",
    courses: 3,
  },
  {
    id: "master",
    name: "Master",
    description: "Achieve Excel mastery with VBA and advanced automation",
    icon: "Award",
    color: "#EAB308",
    courses: 2,
  },
];