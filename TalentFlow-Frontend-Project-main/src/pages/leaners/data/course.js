import { LuArrowLeft, LuBook, LuBookOpen, LuChartLine, LuCheck, LuChevronDown, LuChevronUp, LuCircleHelp, LuClock, LuFile, LuInfo, LuVideo } from "react-icons/lu";
import cosImg1 from '../../../images/cos1.jpg'
import cosImg2 from '../../../images/cos2.jpg'
import cosImg3 from '../../../images/cos3.jpg'
import cosImg4 from '../../../images/cos4.jpg'
import cosImg5 from '../../../images/cos5.jpg'
import cosImg6 from '../../../images/cos6.jpg'
export const progressCards = [
        {
            title : 'Total Lessons',
            value : 2
        },
        {
            title : 'Completed',
            value : 2,
        },
        {
            title : 'Remaining',
            value : 0
        }
];

export const courseType = [
        {
            id : 1,
            image : cosImg1,
            status : 'In Progress',
            category : 'Development',
            title : 'Introduction to Web Development',
            text : 'Learn the fundamentals of HTML, CSS, and Javascript to build modern web...',
            author : 'Chukwuemeka Nwosu',
            modules : 4,
            percent : 65,
            style : 'bg-[#E8F0FB] text-[#2563EB]',
            weeks : 6,
            modulesView : [
                {
                    id : 1,
                    title : 'HTML and CSS Basics',
                    sub_title : 'Learn the basics of HTML and CSS to structure and style web pages',
                    no_of_lessons : 3,
                    lesssons_completed : 2,
                    duration : 4,
                    lessons : [
                        {
                            id : 1,
                            title : 'Introduction to HTML',
                            resource_type : 'Video',
                            duration : '25 min',
                            status : 'Completed',
                            icon : LuCheck,
                            assignment: {
                            title: 'Basic HTML Page',
                            due_date: '2026-04-10',
                            points: 10,
                            instructions: 'Create a simple HTML page with headings, paragraphs, and a list.'
                            }
                        },
                        {
                            id : 2,
                            title : 'CSS Fundamentals',
                            resource_type : 'Video',
                            duration : '30 min',
                            status : 'Completed',
                            icon : LuCheck,
                            assignment: {
                                title: 'Basic HTML Page',
                                due_date: '2026-04-10',
                                points: 10,
                                instructions: 'Create a simple HTML page with headings, paragraphs, and a list.'
                            }
                        },
                        {
                            id : 3,
                            title : 'Responsive Design',
                            resource_type : 'Pdf',
                            status : '',
                            icon : LuFile,
                            assignment: {
                            title: 'Style a Web Page',
                            due_date: '2026-04-12',
                            points: 15,
                            instructions: 'Apply CSS styles to an HTML page using colors, fonts, and spacing.'
                            }
                        }
                    ]
                },
                {
                    id : 2,
                    title : 'Javascript Fundamentals',
                    sub_title : 'Explore the fundamentals of Javascript to add interactivity to your web pages',
                    no_of_lessons : 2,
                    lesssons_completed : 1,
                    duration : 4,
                    lessons : [
                        {
                            id : 1,
                            title : 'JavaScript Basics',
                            resource_type : 'Video',
                            duration : '45 min',
                            status : 'Completed',
                            icon : LuCheck,
                            assignment: {
                            title: 'Responsive Layout',
                            due_date: '2026-04-15',
                            points: 20,
                            instructions: 'Build a responsive layout using media queries for mobile and desktop.'
                            }
                        },
                        {
                            id : 2,
                            title : 'DOM Manipulation',
                            resource_type : 'Video',
                            duration : '35 min',
                            status : 'Completed',
                            icon : LuVideo,
                            assignment: {
                            title: 'JavaScript Fundamentals Task',
                            due_date: '2026-04-18',
                            points: 20,
                            instructions: 'Write basic JavaScript programs using variables, functions, and conditionals.'
                            }
                        },
                    ]
                },
                {
                    id : 3,
                    title : 'Responsive Design',
                    sub_title : 'Discover how to create responsive web designs that work on all devices',
                    no_of_lessons : 3,
                    lesssons_completed : 2,
                    duration : 4,
                    lessons : [
                        {
                            id : 1,
                            title : 'Design Thinking',
                            resource_type : 'Note',
                            status : 'Completed',
                            icon : LuCheck,
                            lessonContent : {
                                title: "Design Thinking",
                                introduction: "Design Thinking is a human-centered approach to innovation that draws from the designer's toolkit to integrate the needs of people, the possibilities of technology, and the requirements for business success.",
                                sections: [
                                    {
                                    heading: "What is Design Thinking?",
                                    content: "Design Thinking is a methodology used by designers to solve complex problems and find desirable solutions. It revolves around understanding users and developing empathy for them."
                                    },
                                    {
                                    heading: "The Five Stages of Design Thinking",
                                    list: [
                                        "Empathize: Research your users' needs",
                                        "Define: State your users' needs and problems",
                                        "Ideate: Challenge assumptions and create ideas",
                                        "Prototype: Start to create solutions",
                                        "Test: Try your solutions out"
                                    ]
                                    },
                                    {
                                    heading: "Why Design Thinking Matters",
                                    content: "Design Thinking fosters innovation by focusing on users, leading to better products and reducing risks before investing heavily."
                                    },
                                    {
                                    heading: "Key Principles",
                                    list: [
                                        "Human-centered: Always focus on the user",
                                        "Collaborative: Bring diverse perspectives together",
                                        "Iterative: Build, test, and refine repeatedly",
                                        "Visual: Use sketches, prototypes, and diagrams",
                                        "Action-oriented: Focus on doing, not just thinking"
                                    ]
                                    }
                                ]
                                },
                            assignment: {
                            title: 'Design Thinking Task',
                            due_date: '2026-04-18',
                            points: 20,
                            instructions: 'Explain the design thinking process and apply it to a small case study.'
                            }
                        },
                        {
                            id : 2,
                            title : 'Wireframing and Prototyping',
                            resource_type : 'Video',
                            duration : '20 min',
                            status : 'Completed',
                            icon : LuCheck,
                            assignment: {
                            title: 'Wireframe Project',
                            due_date: '2026-04-19',
                            points: 25,
                            instructions: 'Create a wireframe and prototype for a simple app or website.'
                            }
                        },
                        {
                            id : 3,
                            title : 'User Testing',
                            resource_type : 'Quiz',
                            quiz : {
                                title : 'User Testing Fundamentals',
                                duration : 5,
                                questions : [
                                    {
                                        id : 1,
                                        question : 'What is the primary goal of user testing?',
                                        options : [
                                            "To find bugs in code",
                                            "To validate that the design meets user needs and expectation",
                                            "To impress stakeholders with fancy features",
                                            "To increase the project budget"
                                        ],
                                        correctAnswer : 1
                                    },
                                    {
                                        id : 2,
                                        question : 'How many participants are typically needed for effective usability testing?',
                                        options : [
                                            "1-2 users",
                                            "5-8 users",
                                            "20-30 users",
                                            "100+ users"
                                        ],
                                        correctAnswer : 2
                                    },
                                    {
                                        id : 3,
                                        question : 'What is A/B testing?',
                                        options : [
                                            "Testing the first two features of a product",
                                            "Comparing two versions of a design to see which performs better",
                                            "Testing alphabetically organized content",
                                            "A grading system for user interfaces"
                                        ],
                                        correctAnswer : 1 
                                    },
                                    {
                                        id : 4,
                                        question : 'When should user testing be conducted?',
                                        options : [
                                            "Only at the end of the project",
                                            "Only at the beginning of the project",
                                            "Throughout the entire design process",
                                            "Never, It's a waste of time"
                                        ],
                                        correctAnswer : 2
                                    },
                                    {
                                        id : 5, 
                                        question : 'What is a "think-aloud protocol" in user testing?',
                                        options : [
                                            "A method where users silently complete tasks",
                                            "A technique where users verbalize their thoughts while using the product",
                                            "A way to test audio features",
                                            "A debugging technique for developers"
                                        ],
                                        correctAnswer : 1
                                    }
                                ]
                            },
                            icon : LuCircleHelp,
                            assignment: {
                            title: 'User Testing Report',
                            due_date: '2026-04-20',
                            points: 30,
                            instructions: 'Conduct a user test on your prototype and document the findings.'
                            }
                        },
                    ]
                },
                {
                    id : 4,
                    title : 'DOM Manipulation',
                    sub_title : 'Learn how to manipulate the Document Object Model (DOM) to dynamically change web content',
                    no_of_lessons : 5,
                    lesssons_completed : 2,
                    duration : 4,
                    lessons : [
                        {
                            id : 1,
                            title : 'Python Basics',
                            resource_type : 'Video',
                            duration : '30 min',
                            status : 'Completed',
                            icon : LuCheck,
                            assignment: {
                            title: 'Python Fundamentals Task',
                            due_date: '2026-04-18',
                            points: 20,
                            instructions: 'Write Python programs using variables, loops, and functions.'
                            }
                        },
                        {
                            id : 2,
                            title : 'Data Manipulation  with Pandas',
                            resource_type : 'Note',
                            status : 'Completed',
                            icon : LuCheck,
                            lessonContent : {
                            title: "Pandas",

                            introduction:
                                "Pandas is a powerful Python library for data manipulation and analysis. It provides data structures and functions needed to manipulate structured data seamlessly.",

                            sections: [
                                {
                                heading: "Introduction to Pandas",
                                content:
                                    "Pandas is built on top of NumPy and provides easy-to-use data structures and data analysis tools for Python. The two primary data structures are Series (1-dimensional) and DataFrame (2-dimensional)."
                                },
                                {
                                heading: "DataFrames and Series",
                                content:
                                    "A DataFrame is a 2-dimensional labeled data structure with columns of potentially different types, similar to a spreadsheet or SQL table. A Series is a one-dimensional labeled array capable of holding any data type."
                                },
                                {
                                heading: "Reading Data",
                                code: `import pandas as pd

                            # Read CSV file
                            df = pd.read_csv('data.csv')

                            # Read Excel file
                            df = pd.read_excel('data.xlsx')

                            # Read JSON file
                            df = pd.read_json('data.json')`
                                },
                                {
                                heading: "Data Manipulation Operations",
                                list: [
                                    "Selecting data: df['column_name'] or df.loc[row_indexer, col_indexer]",
                                    "Filtering: df[df['column'] > value]",
                                    "Sorting: df.sort_values(by='column')",
                                    "Grouping: df.groupby('column').mean()",
                                    "Merging: pd.merge(df1, df2, on='key')"
                                ]
                                },
                                {
                                heading: "Handling Missing Data",
                                code: `# Check for missing values
                            df.isnull().sum()

                            # Drop missing values
                            df.dropna()

                            # Fill missing values
                            df.fillna(value=0)`
                                }
                            ]},
                            assignment: {
                            title: 'Pandas Data Task',
                            due_date: '2026-04-19',
                            points: 25,
                            instructions: 'Perform basic data manipulation and cleaning using Pandas.'
                            }
                        },
                        {
                            id : 3,
                            title : 'Data Visualization',
                            resource_type : 'Video',
                            duration : '40 min',
                            icon : LuVideo,
                            assignment: {
                            title: 'Visualization Project',
                            due_date: '2026-04-21',
                            points: 30,
                            instructions: 'Create charts and plots to visualize sample datasets.'
                            }
                        },
                        {
                            id : 4,
                            title : 'Advanced Data Analysis',
                            resource_type : 'Note',
                            icon : LuBook,
                            lessonContent : {
                                title: "Advanced Data Analysis",

                                introduction:
                                    "This lesson covers the fundamental concepts and practical applications of the topic. Understanding these core principles will help you build a strong foundation for advanced topics.",

                                sections: [
                                    {
                                    heading: "Key Concepts",
                                    list: [
                                        "Understanding the fundamentals: Learn the basic principles that form the foundation of this topic.",
                                        "Practical applications: Discover how these concepts are applied in real-world scenarios.",
                                        "Best practices: Follow industry-standard approaches and expert recommendations."
                                    ]
                                    }
                                ]
                                },
                            assignment: {
                            title: 'Advanced Analysis Task',
                            due_date: '2026-04-22',
                            points: 35,
                            instructions: 'Analyze datasets using advanced Pandas and NumPy techniques.'
                            }
                        },
                        {
                            id : 5,
                            title : 'Machine Learning Basics',
                            resource_type : 'Video',
                            duration : '50 min',
                            icon : LuVideo,
                            assignment: {
                            title: 'ML Fundamentals Task',
                            due_date: '2026-04-25',
                            points: 40,
                            instructions: 'Build and evaluate a basic machine learning model using Python.'
                            }
                        },
                    ]
                },
            ]

        },
        {
            id : 2,
            image : cosImg2,
            status : 'In Progress',
            category : 'Design',
            title : 'UI/UX Design Principles',
            text : 'Master the art of creating beautiful and functional user interfaces with modern...',
            author : 'Amina Bello',
            modules : 3,
            percent : 30,
            weeks : 6,
            style : 'bg-[#E8F0FB] text-[#2563EB]',
            modulesView : [
                {
                    id : 1,
                    title : 'Design Thinking',
                    sub_title : 'Understand the principles of design thinking to create user-centered designs',
                    no_of_lessons : 6,
                    lesssons_completed : 2,
                    duration : 2,
                    lessons : [
                        {
                            id : 1,
                            title : 'React Native Basics',
                            resource_type : 'Video',
                            duration : '45 min',
                            status : 'Completed',
                            icon : LuCheck,
                            assignment: {
                            title: 'React Native Fundamentals',
                            due_date: '2026-04-18',
                            points: 20,
                            instructions: 'Build a simple mobile app with basic UI components.'
                            }
                        },
                        {
                            id : 2,
                            title : 'UI Components',
                            resource_type : 'Note',
                            status : 'Completed',
                            icon : LuCheck,lessonContent : {
                            title: "React Native UI Components",

                            introduction:
                                "React Native UI Components are the building blocks of your mobile application. Understanding how to use and customize these components is essential for creating beautiful and functional apps.",

                            sections: [
                                {
                                heading: "Core Components Overview",
                                list: [
                                    "View: The fundamental container supporting layout with flexbox",
                                    "Text: Display text content",
                                    "Image: Display various types of images",
                                    "ScrollView: Scrollable container",
                                    "TextInput: Text input field via keyboard"
                                ]
                                },
                                {
                                heading: "Styling Components",
                                content:
                                    "React Native uses JavaScript objects for styling, similar to CSS.",
                                code: `const styles = StyleSheet.create({
                            container: {
                                flex: 1,
                                backgroundColor: '#fff',
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                            text: {
                                fontSize: 20,
                                color: '#333',
                            }
                            });`
                                },
                                {
                                heading: "List Components",
                                list: [
                                    "FlatList: Performant scrolling list for large datasets",
                                    "SectionList: Lists with section headers"
                                ],
                                code: `<FlatList
                            data={items}
                            renderItem={({item}) => <Text>{item.title}</Text>}
                            keyExtractor={item => item.id}
                            />`
                                },
                                {
                                heading: "Touchable Components",
                                list: [
                                    "TouchableOpacity: Reduces opacity when pressed",
                                    "TouchableHighlight: Shows highlight color",
                                    "Pressable: Modern touch handler with more control"
                                ]
                                }
                            ]
                            },
                            assignment: {
                            title: 'UI Component Task',
                            due_date: '2026-04-19',
                            points: 15,
                            instructions: 'Create reusable UI components and document their usage.'
                            }
                        },
                        {
                            id : 3,
                            title : 'State Management',
                            resource_type : 'Video',
                            duration : '30 min',
                            icon : LuVideo,
                            assignment: {
                            title: 'State Management Task',
                            due_date: '2026-04-20',
                            points: 25,
                            instructions: 'Implement state management in a small React Native project.'
                            }
                        },
                        {
                            id : 4,
                            title : 'Navigation',
                            resource_type : 'Note',
                            icon : LuFile,
                            lessonContent : {
                            title: "Navigation",

                            introduction:
                                "This lesson covers the fundamental concepts and practical applications of the topic. Understanding these core principles will help you build a strong foundation for advanced topics.",

                            sections: [
                                {
                                heading: "Key Concepts",
                                list: [
                                    "Understanding the fundamentals: Learn the basic principles that form the foundation of this topic.",
                                    "Practical applications: Discover how these concepts are applied in real-world scenarios.",
                                    "Best practices: Follow industry-standard approaches and expert recommendations."
                                ]
                                }
                            ]
                            },
                            assignment: {
                            title: 'Navigation Task',
                            due_date: '2026-04-21',
                            points: 20,
                            instructions: 'Set up navigation between multiple screens in React Native.'
                            }
                        },
                        {
                            id : 5,
                            title : 'API Integration',
                            resource_type : 'Video',
                            duration : '40 min',
                            icon : LuVideo,
                            assignment: {
                                title: 'API Project',
                                due_date: '2026-04-23',
                                points: 30,
                                instructions: 'Fetch data from an API and display it in your app.'
                                }
                        },
                        {
                            id : 6,
                            title : 'Testing and Debugging',
                            resource_type : 'Note',
                            icon : LuFile,
                            lessonContent : {
                                title: "Testing and Debugging",

                                introduction:
                                    "This lesson covers the fundamental concepts and practical applications of the topic. Understanding these core principles will help you build a strong foundation for advanced topics.",

                                sections: [
                                    {
                                    heading: "Key Concepts",
                                    list: [
                                        "Understanding the fundamentals: Learn the basic principles that form the foundation of this topic.",
                                        "Practical applications: Discover how these concepts are applied in real-world scenarios.",
                                        "Best practices: Follow industry-standard approaches and expert recommendations."
                                    ]
                                    }
                                ]
                            },
                            assignment: {
                                title: 'Testing Task',
                                due_date: '2026-04-24',
                                points: 25,
                                instructions: 'Write basic tests and debug your React Native app.'
                                }
                        },
                    ]
                },
                {
                    id : 2,
                    title : 'Wireframming and Prototyping',
                    sub_title : 'Learn how to create wireframes and prototypes to visualize your design ideas',
                    no_of_lessons : 2,
                    lesssons_completed : 2,
                    duration : 2,
                    lessons : [
                        {
                            id : 1,
                            title : 'SEO Basics',
                            resource_type : 'Video',
                            duration : '30 min',
                            status : 'Completed',
                            icon : LuCheck,
                            assignment: {
                                title: 'SEO Task',
                                due_date: '2026-04-18',
                                points: 20,
                                instructions: 'Optimize a sample website for search engines.'
                            }
                        },
                        {
                            id : 2,
                            title : 'Social Media Marketing',
                            resource_type : 'Note',
                            status : 'Completed',
                            icon : LuCheck,
                            lessonContent : {
                                title: "Social Media Marketing",

                                introduction:
                                    "Social Media Marketing is the use of social media platforms to connect with your audience, build your brand, increase sales, and drive website traffic.",

                                sections: [
                                    {
                                    heading: "Understanding Social Media Marketing",
                                    content:
                                        "Social Media Marketing involves creating and sharing content on social media networks to achieve your marketing and branding goals. It includes activities like posting text and image updates, videos, and other content that drives audience engagement."
                                    },
                                    {
                                    heading: "Major Social Media Platforms",
                                    list: [
                                        "Facebook: Largest platform, great for community building",
                                        "Instagram: Visual platform, ideal for brand storytelling",
                                        "Twitter: Real-time updates and customer service",
                                        "LinkedIn: Professional networking and B2B marketing",
                                        "TikTok: Short-form video content, younger audience",
                                        "YouTube: Long-form video content and tutorials"
                                    ]
                                    },
                                    {
                                    heading: "Content Strategy",
                                    orderedList: [
                                        "Know your audience demographics and preferences",
                                        "Set clear goals (awareness, engagement, conversions)",
                                        "Create a content calendar",
                                        "Mix content types (educational, entertaining, promotional)",
                                        "Use the 80/20 rule: 80% value, 20% promotion",
                                        "Engage with your community regularly"
                                    ]
                                    },
                                    {
                                    heading: "Metrics and Analytics",
                                    list: [
                                        "Reach: How many people see your content",
                                        "Engagement: Likes, comments, shares, clicks",
                                        "Conversion: Actions taken from social media",
                                        "Follower Growth: Rate of audience expansion",
                                        "Click-Through Rate (CTR): Percentage who click your links"
                                    ]
                                    },
                                    {
                                    heading: "Best Practices",
                                    list: [
                                        "Post consistently at optimal times",
                                        "Use high-quality visuals",
                                        "Write compelling captions with clear CTAs",
                                        "Use relevant hashtags (research-based)",
                                        "Respond to comments and messages promptly",
                                        "Test different content formats",
                                        "Analyze and adjust your strategy regularly"
                                    ]
                                    }
                                ]
                                },
                            assignment: {
                            title: 'Social Media Strategy Task',
                            due_date: '2026-04-19',
                            points: 25,
                            instructions: 'Create a social media marketing plan for a small business.'
                            }
                        },
                    ]
                },
                {
                    id : 3,
                    title : 'User Testing',
                    sub_title : 'Discover how to conduct user testing to gather feedback and improve your designs',
                    no_of_lessons : 3,
                    lesssons_completed : 2,
                    duration : 2,
                    lessons : [
                        {
                            id : 1,
                            title : 'Project Planning',
                            resource_type : 'Video',
                            duration : '40 min',
                            status : 'Completed',
                            icon : LuCheck,
                            assignment: {
                                title: 'Project Planning Task',
                                due_date: '2026-04-18',
                                points: 20,
                                instructions: 'Draft a project plan for a hypothetical project.'
                                }
                        },
                        {
                            id : 2,
                            title : 'Execution and Monitoring',
                            resource_type : 'Note',
                            status : 'Completed',
                            icon : LuCheck,
                            lessonContent : {
                                title: "Execution and Monitoring",

                                introduction:
                                    "Execution and Monitoring are critical phases in project management that ensure your project stays on track and achieves its objectives.",

                                sections: [
                                    {
                                    heading: "Project Execution Phase",
                                    content:
                                        "The execution phase is where your project plan is put into action.",
                                    list: [
                                        "Coordinating people and resources",
                                        "Managing stakeholder expectations",
                                        "Integrating and performing project activities",
                                        "Ensuring deliverables meet quality standards",
                                        "Managing changes to the project scope"
                                    ]
                                    },
                                    {
                                    heading: "Key Execution Activities",
                                    orderedList: [
                                        "Team Management: Assign tasks, provide guidance, resolve conflicts",
                                        "Resource Allocation: Ensure resources are available when needed",
                                        "Quality Assurance: Check that work meets requirements",
                                        "Communication: Keep stakeholders informed",
                                        "Risk Management: Monitor and respond to risks"
                                    ]
                                    },
                                    {
                                    heading: "Project Monitoring",
                                    content:
                                        "Monitoring involves tracking project progress and performance.",
                                    list: [
                                        "Track key performance indicators (KPIs)",
                                        "Compare actual progress vs. planned schedule",
                                        "Monitor budget expenditure",
                                        "Review quality of deliverables",
                                        "Identify variances and take corrective action"
                                    ]
                                    },
                                    {
                                    heading: "Tools and Techniques",
                                    list: [
                                        "Gantt Charts: Visual timeline of tasks",
                                        "Burn-down Charts: Track work completion",
                                        "Status Reports: Regular progress updates",
                                        "Milestone Reviews: Check progress at key points",
                                        "Earned Value Management: Measure project performance"
                                    ]
                                    },
                                    {
                                    heading: "Common Challenges",
                                    list: [
                                        "Scope creep: Uncontrolled changes to scope",
                                        "Resource conflicts: Competing priorities",
                                        "Communication breakdowns: Misalignment",
                                        "Schedule delays: Tasks taking longer than planned",
                                        "Budget overruns: Costs exceeding estimates"
                                    ]
                                    }
                                ]
                                },
                            assignment: {
                            title: 'Execution Task',
                            due_date: '2026-04-19',
                            points: 25,
                            instructions: 'Simulate project execution and track progress.'
                            }
                        },
                        {
                            id : 3,
                            title : 'Team Leadership',
                            resource_type : 'Video',
                            duration : '30 min',
                            status : 'Completed',
                            icon : LuVideo,
                            assignment: {
                            title: 'Leadership Task',
                            due_date: '2026-04-20',
                            points: 30,
                            instructions: 'Develop a strategy to lead a project team effectively.'
                            }
                        },
                        
                    ]
                },
            ]
        },
        {
            id : 3,
            image : cosImg3,
            status : '',
            category : 'Data Science',
            title : 'Data Analysics with Python',
            text : 'Dive into data analysis using Python, pandas, and visualization libraries',
            author : 'Oluwaseun Adeyemi',
            modules : 5,
            percent : 0,
            weeks : 10,
            modulesView : [
                {
                    id : 1,
                    title : 'Python Basics',
                    sub_title : 'Learn the basics of Python programming to start your data analysis journey',
                    no_of_lessons : 0,
                    lesssons_completed : 0,
                    duration : 2,
                },
                {
                    id : 2,
                    title : 'Data Manipulation with Pandas',
                    sub_title : 'Explore data manipulation techniques using the pandas library in Python.',
                    no_of_lessons : 0,
                    lesssons_completed : 0,
                    duration : 2,
                },
                {
                    id : 3,
                    title : 'Data Visualization',
                    sub_title : 'Learn how to create visualizations to effectively communicate your data insights',
                    no_of_lessons : 0,
                    lesssons_completed : 0,
                    duration : 2,
                },
                {
                    id : 4,
                    title : 'Advanced Data Analysis',
                    sub_title : 'Dive into advanced data analysis techniques to extract meaningful insights from your data.',
                    no_of_lessons : 0,
                    lesssons_completed : 0,
                    duration : 2,
                },
                {
                    id : 5,
                    title : 'Machine Learning Basics',
                    sub_title : 'Get an introduction to machine learning concepts and their applications in data analysis',
                    no_of_lessons : 0,
                    lesssons_completed : 0,
                    duration : 2,
                },
            ]
        },
        {
            id : 4,
            image : cosImg4,
            status : '',
            category : 'Development',
            title : 'Mobile App Development',
            text : 'Build native mobile applications for IOS and Android using React Native.',
            author : 'Chukwuemeka Nwosu',
            modules : 6,
            percent : 0,
            weeks : 12,
            modulesView : [
                {
                    id : 1,
                    title : 'React Native Basics',
                    sub_title : 'Learn the basics of React Native to start building mobile applications',
                    no_of_lessons : 0,
                    lesssons_completed : 0,
                    duration : 2,
                },
                {
                    id : 2,
                    title : 'UI Components',
                    sub_title : 'Explore UI components in React Native to create a user-friendly interface.',
                    no_of_lessons : 0,
                    lesssons_completed : 0,
                    duration : 2,
                },
                {
                    id : 3,
                    title : 'State Management',
                    sub_title : 'Learn how to manage state in React Native applications to build dynamic interfaces.',
                    no_of_lessons : 0,
                    lesssons_completed : 0,
                    duration : 2,
                },
                {
                    id : 4,
                    title : 'Navigation',
                    sub_title : 'Discover how to implement navigation in React Native to create a seamless user experience',
                    no_of_lessons : 0,
                    lesssons_completed : 0,
                    duration : 2,
                },
                {
                    id : 5,
                    title : 'API Integration',
                    sub_title : 'Learn how to integrate APIs in React Native to fetch and display in your applications.',
                    no_of_lessons : 0,
                    lesssons_completed : 0,
                    duration : 2,
                },
                {
                    id : 6,
                    title : 'Testing and Debugging',
                    sub_title : 'Explore testing and debugging techniques to ensure the quality of your React Native applications',
                    no_of_lessons : 0,
                    lesssons_completed : 0,
                    duration : 2,
                },
            ]
        },
        {
            id :5,
            image : cosImg5,
            status : 'Completed',
            category : 'Marketing',
            title : 'Digital Marketing Fundamentals',
            text : 'Learn strategies for SEO, social media marketing, and content creation',
            author : 'Blessing Okafor',
            modules : 2,
            percent : 100,
            style : 'bg-[#E8F5EC] text-[#1A7A4A]',
            weeks : 5,
            modulesView : [
                {
                    id : 1,
                    title : 'SEO Basics',
                    sub_title : 'Learn the fundamentals of Search Engine Optimization (SEO) to improve your websites visibility ',
                    no_of_lessons : 0,
                    lesssons_completed : 0,
                    duration : 2,
                },
                {
                    id : 2,
                    title : 'Social Media Marketing',
                    sub_title : 'Explore strategies for social media marketing to reach and engage your audience',
                    no_of_lessons : 0,
                    lesssons_completed : 0,
                    duration : 2,
                },
            ]

        },
        {
            id : 6,
            image : cosImg6,
            status : '',
            category : 'Business',
            title : 'Project Management Essentials',
            text : 'Master project planning, execution and team leadership skills',
            author : 'Ibrahim Mohammed',
            modules : 3,
            percent : 0,
            weeks : 7,
            modulesView : [
                {
                    id : 1,
                    title : 'Project Planning',
                    sub_title : 'Learn how to plan projects effectively to ensure successful outcomes',
                    no_of_lessons : 0,
                    lesssons_completed : 0,
                    duration : 2,
                },
                {
                    id : 2,
                    title : 'Execution and Monitoring',
                    sub_title : 'Discover how to execute and monitor projects to stay on track and meet objectives',
                    no_of_lessons : 0,
                    lesssons_completed : 0,
                    duration : 2,
                },
                {
                    id : 3,
                    title : 'Team Leadership',
                    sub_title : 'Explore team leadership skills to manage and motivate your project team.',
                    no_of_lessons : 0,
                    lesssons_completed : 0,
                    duration : 2,
                },
            ]
        }
    ];