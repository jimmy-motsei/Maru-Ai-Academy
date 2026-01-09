// Lesson Content Schema for Interactive Academy
// This allows creating lessons without code changes

export interface LessonStep {
  id: string;
  title: string;
  type: 'concept' | 'challenge' | 'recap';
  
  // Content for the left panel (instruction area)
  instruction: {
    heading: string;
    body: string; // Supports markdown-like formatting
    tips?: string[];
    examples?: {
      bad?: string;
      good?: string;
    };
  };
  
  // Right panel content type
  playground?: {
    type: 'prompt-gym' | 'quiz' | 'visual' | 'code-sandbox';
    
    // For prompt-gym type
    promptChallenge?: {
      initialMessage: string;
      successResponse: string;
      hint: string;
      gradingContext: {
        goal: string;
        criteria: string[];
        exampleGoodPrompt?: string;
      };
      // Fallback validation
      validation?: {
        requiredKeywords?: string[];
        forbiddenKeywords?: string[];
        minLength?: number;
      };
    };
    
    // For quiz type
    quiz?: {
      questions: {
        question: string;
        options: string[];
        correctIndex: number;
        explanation: string;
      }[];
      passingScore: number; // percentage
    };
    
    // For visual type (concept illustrations)
    visual?: {
      type: 'animation' | 'diagram' | 'image';
      src?: string;
      caption?: string;
    };
  };
}

export interface Lesson {
  id: string;
  moduleId: string;
  slug: string;
  title: string;
  description: string;
  duration: string; // e.g., "15 min"
  order: number;
  steps: LessonStep[];
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  stream: 'beginner' | 'intermediate';
  order: number;
  icon: string;
  duration: string;
  lessons: Lesson[];
  learningOutcomes: string[];
}

// Complete Beginner Curriculum
export const beginnerCurriculum: Module[] = [
  {
    id: 'mod-1',
    slug: 'ai-made-simple',
    title: 'AI Made Simple',
    description: 'Foundations & Safety - Get a confident, practical start with AI',
    stream: 'beginner',
    order: 1,
    icon: '🧠',
    duration: '45 min',
    learningOutcomes: [
      'Explain what AI is in plain English',
      'Identify the right AI tool for different tasks',
      'Apply POPIA-compliant data safety practices',
      'Use the 5-part prompt pattern for consistent outputs',
      'Implement quick wins for emails, slides, and reports'
    ],
    lessons: [
      {
        id: 'les-1-1',
        moduleId: 'mod-1',
        slug: 'what-is-ai',
        title: 'What AI Actually Is',
        description: 'Understand AI in plain English - no jargon, no hype',
        duration: '8 min',
        order: 1,
        steps: [
          {
            id: 'step-1',
            title: 'The Simple Truth About AI',
            type: 'concept',
            instruction: {
              heading: 'AI is Pattern Recognition at Scale',
              body: `Forget the sci-fi movies. Today's AI is essentially a very sophisticated pattern-matching system that has "read" billions of documents.\n\nThink of it like this:\n- **Autocomplete on steroids** - It predicts what comes next based on patterns\n- **A brilliant intern** - Smart but needs context and clear instructions\n- **A tool, not magic** - It amplifies your work, doesn't replace thinking`,
              tips: [
                'AI doesn\'t "think" or "understand" - it predicts probable outputs',
                'The quality of output depends entirely on the quality of input',
                'AI is best for drafts, brainstorming, and repetitive tasks'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'AI processes your input through patterns learned from training data'
              }
            }
          },
          {
            id: 'step-2',
            title: 'Challenge: Explain AI to Your Boss',
            type: 'challenge',
            instruction: {
              heading: 'Your Mission',
              body: `Your CEO asks: "What is this ChatGPT thing everyone's talking about?"\n\nYour goal: Write a prompt that generates a simple, jargon-free explanation of AI.\n\n**Requirements:**\n- Target audience: Non-technical executive\n- Length: Under 3 sentences\n- Tone: Professional, not condescending`,
              examples: {
                bad: 'Explain AI',
                good: 'Act as a tech advisor. Explain AI to a non-technical CEO in under 3 sentences. Avoid jargon. Focus on practical business implications.'
              }
            },
            playground: {
              type: 'prompt-gym',
              promptChallenge: {
                initialMessage: "Your CEO just walked in and asked about AI. What prompt would you use to generate a clear explanation for them?",
                successResponse: "Perfect! You've created a prompt that will generate a CEO-appropriate explanation. Notice how specifying the audience and constraints leads to better outputs.",
                hint: "Remember to specify the target audience (non-technical) and set constraints (length, no jargon).",
                gradingContext: {
                  goal: "Write a prompt that generates a simple AI explanation for a non-technical executive",
                  criteria: [
                    "Specifies the target audience (CEO, executive, non-technical)",
                    "Sets length or simplicity constraints",
                    "Requests jargon-free or simple language",
                    "Focuses on practical/business relevance",
                    "Is specific enough to generate a useful response"
                  ],
                  exampleGoodPrompt: "Act as a tech advisor. Explain what AI and ChatGPT are to a non-technical CEO in 2-3 simple sentences. Avoid technical jargon. Focus on how it can help with everyday business tasks."
                },
                validation: {
                  requiredKeywords: ['CEO', 'explain'],
                  minLength: 20
                }
              }
            }
          }
        ]
      },
      {
        id: 'les-1-2',
        moduleId: 'mod-1',
        slug: 'tool-categories',
        title: 'Tool Categories You\'ll Use',
        description: 'Know which AI tool to use for which task',
        duration: '10 min',
        order: 2,
        steps: [
          {
            id: 'step-1',
            title: 'The AI Tool Landscape',
            type: 'concept',
            instruction: {
              heading: 'Not All AI Tools Are Created Equal',
              body: `Different AI tools excel at different tasks. Here's your mental map:\n\n**Text/Chat AI** (ChatGPT, Claude, Gemini)\n→ Writing, analysis, brainstorming, coding help\n\n**Image AI** (DALL-E, Midjourney, Stable Diffusion)\n→ Creating visuals, mockups, social media graphics\n\n**Audio/Video AI** (Whisper, ElevenLabs, Synthesia)\n→ Transcription, voiceovers, video generation\n\n**Automation AI** (Zapier AI, Make, n8n)\n→ Connecting tools, triggers, workflows`,
              tips: [
                'Start with text AI - it\'s the most versatile',
                'Most business problems can be solved with chat AI + automation',
                'You don\'t need to master all categories - focus on what you need'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'AI Tool Categories for Business'
              }
            }
          },
          {
            id: 'step-2',
            title: 'Challenge: Match the Tool',
            type: 'challenge',
            instruction: {
              heading: 'Scenario: Marketing Campaign',
              body: `You need to create a social media campaign. The tasks include:\n- Writing 10 LinkedIn posts\n- Creating visual thumbnails\n- Transcribing a podcast for quotes\n\nWrite a prompt asking AI to help you identify which tools to use for each task.`,
              tips: [
                'Be specific about each task',
                'Ask for reasoning, not just tool names'
              ]
            },
            playground: {
              type: 'prompt-gym',
              promptChallenge: {
                initialMessage: "You're planning a marketing campaign with multiple assets. How would you ask AI to help you pick the right tools?",
                successResponse: "Great job! By listing specific tasks and asking for tool recommendations with reasoning, you'll get actionable guidance tailored to your needs.",
                hint: "List the specific tasks and ask which category of AI tool is best for each, with reasons.",
                gradingContext: {
                  goal: "Write a prompt asking AI to recommend the right AI tools for different marketing campaign tasks",
                  criteria: [
                    "Lists specific tasks that need to be done",
                    "Asks for tool recommendations or categories",
                    "Requests reasoning or justification for choices",
                    "Is clear about the context (marketing campaign)",
                    "Structured enough to get organized output"
                  ],
                  exampleGoodPrompt: "I'm running a marketing campaign and need help with: 1) Writing 10 LinkedIn posts, 2) Creating thumbnail images, 3) Transcribing a podcast. For each task, recommend the best type of AI tool and explain why it's the right choice."
                },
                validation: {
                  requiredKeywords: ['task', 'tool'],
                  minLength: 30
                }
              }
            }
          }
        ]
      },
      {
        id: 'les-1-3',
        moduleId: 'mod-1',
        slug: 'data-safety',
        title: 'Safe Use & POPIA Basics',
        description: 'Keep your data safe when using AI tools',
        duration: '10 min',
        order: 3,
        steps: [
          {
            id: 'step-1',
            title: 'The Golden Rules of AI Data Safety',
            type: 'concept',
            instruction: {
              heading: 'What NOT to Share with AI',
              body: `AI tools learn from input. Protect yourself and your company:\n\n**NEVER share:**\n🚫 Personal identification numbers (ID, passport)\n🚫 Financial details (bank accounts, salaries)\n🚫 Confidential business data\n🚫 Client personal information\n🚫 Passwords or access credentials\n\n**POPIA Reminder:**\nSouth Africa's POPIA law requires responsible handling of personal information. Using AI doesn't exempt you from these obligations.`,
              tips: [
                'When in doubt, anonymize the data first',
                'Use fictional names and numbers in examples',
                'Check your company\'s AI policy before using external tools'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'Data Safety Checklist for AI Use'
              }
            }
          },
          {
            id: 'step-2',
            title: 'Challenge: Sanitize the Prompt',
            type: 'challenge',
            instruction: {
              heading: 'Fix This Dangerous Prompt',
              body: `A colleague wrote this prompt:\n\n*"Summarize this client contract for ABC Corp. Client contact: John Smith, ID: 8501015800087, email: john@abc.com, contract value R2.5M"*\n\nWrite a SAFE version of this prompt that gets the same result without exposing sensitive data.`,
              examples: {
                bad: 'Include real client names, ID numbers, and contract values',
                good: 'Use [CLIENT NAME], [REDACTED], and generic terms'
              }
            },
            playground: {
              type: 'prompt-gym',
              promptChallenge: {
                initialMessage: "Your colleague shared a prompt with sensitive client data. Rewrite it to be safe while still getting useful output.",
                successResponse: "Excellent! You've protected sensitive data while maintaining the prompt's usefulness. This is a critical skill for professional AI use.",
                hint: "Replace personal identifiers with placeholders like [CLIENT] or [REDACTED]. Remove specific monetary values if not essential.",
                gradingContext: {
                  goal: "Rewrite a prompt with sensitive data to make it POPIA-compliant while maintaining usefulness",
                  criteria: [
                    "Removes or redacts personal identification numbers",
                    "Anonymizes or generalizes client/person names",
                    "Removes or generalizes sensitive financial details if not essential",
                    "Still asks for a useful summary/output",
                    "Uses placeholders or generic terms appropriately"
                  ],
                  exampleGoodPrompt: "Summarize the key terms of this client contract. Focus on deliverables, timelines, and obligations. Note: I've removed specific names and values for confidentiality - just focus on the structure and terms."
                },
                validation: {
                  requiredKeywords: ['summarize', 'contract'],
                  forbiddenKeywords: ['8501015800087', 'john@abc.com'],
                  minLength: 20
                }
              }
            }
          }
        ]
      },
      {
        id: 'les-1-4',
        moduleId: 'mod-1',
        slug: 'five-part-prompt',
        title: 'The 5-Part Prompt Pattern',
        description: 'Master the framework for consistent AI outputs',
        duration: '12 min',
        order: 4,
        steps: [
          {
            id: 'step-1',
            title: 'The Framework That Works Every Time',
            type: 'concept',
            instruction: {
              heading: 'CRAFT: Your Prompt Template',
              body: `**C**ontext — Set the scene and background\n**R**ole — Tell AI who to be\n**A**ction — What specific task to complete\n**F**ormat — How you want the output structured\n**T**one — The style of communication\n\nExample:\n• **Context:** "I'm a marketing manager preparing for a product launch next month."\n• **Role:** "Act as an experienced copywriter."\n• **Action:** "Write 5 email subject lines for the launch announcement."\n• **Format:** "Present as a numbered list with a brief explanation for each."\n• **Tone:** "Professional but exciting."`,
              tips: [
                'You don\'t always need all 5 parts, but more context = better output',
                'Role is often the most powerful element',
                'Format prevents you from getting walls of text'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'The CRAFT Prompt Framework'
              }
            }
          },
          {
            id: 'step-2',
            title: 'Challenge: Build a CRAFT Prompt',
            type: 'challenge',
            instruction: {
              heading: 'Apply the Framework',
              body: `**Scenario:** You need to write a follow-up email to leads who attended your webinar but haven't responded.\n\nBuild a prompt using all 5 CRAFT elements:\n- Context: Webinar follow-up\n- Role: Sales professional\n- Action: Write follow-up email\n- Format: Ready-to-send format\n- Tone: Friendly, not pushy`,
              tips: [
                'Label each part clearly in your prompt',
                'Be specific about the webinar topic if possible'
              ]
            },
            playground: {
              type: 'prompt-gym',
              promptChallenge: {
                initialMessage: "Let's see you apply the CRAFT framework. Write a complete prompt for the webinar follow-up scenario.",
                successResponse: "Brilliant! You've mastered the CRAFT framework. This structured approach will give you consistent, high-quality outputs every time.",
                hint: "Make sure to include all 5 elements: Context, Role, Action, Format, and Tone. Be explicit about each.",
                gradingContext: {
                  goal: "Create a prompt using the CRAFT framework (Context, Role, Action, Format, Tone) for a sales follow-up email",
                  criteria: [
                    "Includes Context (webinar follow-up, leads who haven't responded)",
                    "Sets a Role (sales rep, copywriter, etc.)",
                    "Specifies the Action clearly (write follow-up email)",
                    "Defines the Format (email format, ready to send, length)",
                    "Establishes Tone (friendly, not pushy, professional)"
                  ],
                  exampleGoodPrompt: "Context: I hosted a webinar on AI productivity last week. 50 attendees haven't responded to our initial email.\n\nRole: Act as an experienced sales professional.\n\nAction: Write a follow-up email to re-engage these leads.\n\nFormat: Write as a complete, ready-to-send email under 150 words.\n\nTone: Friendly and helpful, not salesy or pushy."
                },
                validation: {
                  requiredKeywords: ['webinar', 'email'],
                  minLength: 50
                }
              }
            }
          }
        ]
      },
      {
        id: 'les-1-5',
        moduleId: 'mod-1',
        slug: 'quick-wins',
        title: 'Quick Wins You Can Use Today',
        description: 'Three immediate time-savers for emails, slides, and reports',
        duration: '10 min',
        order: 5,
        steps: [
          {
            id: 'step-1',
            title: 'Three Templates for Immediate Impact',
            type: 'concept',
            instruction: {
              heading: 'Copy These Templates Today',
              body: `**📧 Email Reply (30 seconds)**\n"Rewrite this email to be more [professional/friendly/concise]. Keep the main message but improve clarity: [paste email]"\n\n**📊 Slide Outline (2 minutes)**\n"Create a 5-slide outline for a presentation about [topic]. Include: Title slide, Problem, Solution, Benefits, Next Steps. Add speaker notes."\n\n**📝 Meeting Summary (1 minute)**\n"Summarize these meeting notes into: 1) Key decisions made, 2) Action items with owners, 3) Next meeting topics. Keep it under 200 words: [paste notes]"`,
              tips: [
                'Save these as text shortcuts on your phone/computer',
                'Customize the templates for your specific needs',
                'Always review AI output before sending'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'Your AI Quick-Win Templates'
              }
            }
          },
          {
            id: 'step-2',
            title: 'Challenge: Create Your Own Template',
            type: 'challenge',
            instruction: {
              heading: 'Build a Personal Quick-Win',
              body: `Think about a task you do repeatedly at work. It could be:\n- Responding to a common customer question\n- Creating status updates\n- Drafting meeting agendas\n- Writing report introductions\n\nCreate a reusable prompt template with variables in [brackets] that you can use daily.`,
              tips: [
                'Use [brackets] for parts that change each time',
                'Include your role and the desired output format',
                'Make it specific to YOUR actual work'
              ]
            },
            playground: {
              type: 'prompt-gym',
              promptChallenge: {
                initialMessage: "Create a reusable template for a task YOU do repeatedly. Use [brackets] for variable parts.",
                successResponse: "Fantastic! You've created your first reusable AI template. This is exactly how power users save hours every week. Save this and use it tomorrow!",
                hint: "Think of a task you do at least weekly. Write a prompt with placeholders like [PROJECT NAME] or [DATE] that you can fill in each time.",
                gradingContext: {
                  goal: "Create a reusable prompt template with variables for a repeated work task",
                  criteria: [
                    "Addresses a real, repeated work task",
                    "Uses [brackets] or similar notation for variable parts",
                    "Is specific enough to generate useful output",
                    "Could realistically save time if used regularly",
                    "Includes context about the type of output needed"
                  ],
                  exampleGoodPrompt: "Weekly Status Update Template:\n\nAct as my writing assistant. Draft a status update email for [PROJECT NAME]. This week we completed [MAIN ACHIEVEMENT]. Next week's focus is [NEXT MILESTONE]. Any blockers: [BLOCKER OR 'None']. Format as a 3-paragraph email to my manager, professional but friendly tone."
                },
                validation: {
                  minLength: 40
                }
              }
            }
          },
          {
            id: 'step-3',
            title: 'Module 1 Complete! 🎉',
            type: 'recap',
            instruction: {
              heading: 'Congratulations!',
              body: `You've completed **AI Made Simple**!\n\n**What you learned:**\n✅ AI is pattern recognition, not magic\n✅ Different tools for different tasks\n✅ How to keep data safe (POPIA)\n✅ The CRAFT prompt framework\n✅ Quick-win templates for daily use\n\n**Your homework:**\nUse at least ONE of today's templates in your real work tomorrow.\n\n**Next up:** Module 2 - Prompts That Work at Work`,
              tips: [
                'Practice makes perfect - use AI daily this week',
                'Save your templates somewhere easy to access',
                'Share a quick win with a colleague'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'Module 1 Complete!'
              }
            }
          }
        ]
      }
    ]
  },
  // MODULE 2: Prompts That Work at Work
  {
    id: 'mod-2',
    slug: 'prompts-that-work',
    title: 'Prompts That Work at Work',
    description: 'Create reusable templates for emails, reports, and presentations',
    stream: 'beginner',
    order: 2,
    icon: '📝',
    duration: '50 min',
    learningOutcomes: [
      'Create reusable prompt templates with variables',
      'Master email and customer reply templates',
      'Build presentation outlines from simple inputs',
      'Generate decision-ready reports',
      'Chain multiple outputs for efficiency'
    ],
    lessons: [
      {
        id: 'les-2-1',
        moduleId: 'mod-2',
        slug: 'template-thinking',
        title: 'Template Thinking',
        description: 'Turn one-off prompts into reusable assets',
        duration: '10 min',
        order: 1,
        steps: [
          {
            id: 'step-1',
            title: 'From Single-Use to Reusable',
            type: 'concept',
            instruction: {
              heading: 'The Power of Template Thinking',
              body: `Most people write a new prompt every time. Power users build templates once and reuse them forever.\n\n**The Template Formula:**\n1. **Fixed parts** - Instructions that never change\n2. **Variable parts** - Use [BRACKETS] for inputs that change\n3. **Quality checks** - Add constraints for consistency\n\n**Example transformation:**\n• One-off: "Write an email to John about the project update"\n• Template: "Write a [TONE] email to [RECIPIENT] about [TOPIC]. Include [KEY POINTS]. Keep it under [WORD COUNT] words."`,
              tips: [
                'Save templates in a notes app or text expander',
                'Start with your most repeated tasks',
                'Test templates 3-4 times before calling them "done"'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'Transform one-off prompts into reusable templates'
              }
            }
          },
          {
            id: 'step-2',
            title: 'Challenge: Convert to Template',
            type: 'challenge',
            instruction: {
              heading: 'Template Conversion',
              body: `Convert this one-off prompt into a reusable template:\n\n*"Write a thank-you email to Sarah from TechCorp for attending our webinar on AI productivity. Mention we'll send the recording and offer a free consultation."*\n\nIdentify the variable parts and replace them with [BRACKETS].`,
              examples: {
                bad: 'Just copy the prompt with small changes',
                good: 'Use [RECIPIENT], [COMPANY], [WEBINAR TOPIC], [FOLLOW-UP OFFER]'
              }
            },
            playground: {
              type: 'prompt-gym',
              promptChallenge: {
                initialMessage: "Take the one-off thank-you email prompt and convert it into a reusable template with variables.",
                successResponse: "Excellent! You've created a template you can use for every webinar follow-up. This will save you 5+ minutes per email.",
                hint: "Look for: recipient name, company name, webinar topic, and the offer. Replace each with a [VARIABLE].",
                gradingContext: {
                  goal: "Convert a specific email prompt into a reusable template with bracket variables",
                  criteria: [
                    "Uses [BRACKETS] for variable parts",
                    "Identifies recipient as a variable",
                    "Identifies company name as a variable",
                    "Identifies webinar topic as a variable",
                    "Maintains the core structure and purpose of the email"
                  ],
                  exampleGoodPrompt: "Write a thank-you email to [RECIPIENT NAME] from [COMPANY] for attending our webinar on [WEBINAR TOPIC]. Mention we'll send the recording within [TIMEFRAME] and offer [FOLLOW-UP OFFER]. Keep the tone warm and professional."
                },
                validation: {
                  requiredKeywords: ['[', ']', 'email'],
                  minLength: 40
                }
              }
            }
          }
        ]
      },
      {
        id: 'les-2-2',
        moduleId: 'mod-2',
        slug: 'email-templates',
        title: 'Email Power Templates',
        description: 'Professional emails in seconds, not minutes',
        duration: '12 min',
        order: 2,
        steps: [
          {
            id: 'step-1',
            title: 'The Email Template Library',
            type: 'concept',
            instruction: {
              heading: 'Five Emails Everyone Needs',
              body: `Build these templates once, use them forever:\n\n**1. The Polite Decline**\n"Thank them for [OPPORTUNITY], decline gracefully citing [REASON], leave door open for future."\n\n**2. The Status Update**\n"Update on [PROJECT]: Progress [X%], blockers [IF ANY], next milestone [DATE]."\n\n**3. The Meeting Request**\n"Request 30-min meeting with [PERSON] about [TOPIC], suggest [3 TIME OPTIONS]."\n\n**4. The Feedback Response**\n"Acknowledge [FEEDBACK TYPE], explain action we're taking, timeline for resolution."\n\n**5. The Introduction**\n"Introduce [PERSON A] to [PERSON B], explain why they should connect, suggest next step."`,
              tips: [
                'Always include tone instructions',
                'Add word limits to keep emails concise',
                'Include "proofread for [AUDIENCE]" at the end'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'Your Email Template Library'
              }
            }
          },
          {
            id: 'step-2',
            title: 'Challenge: The Difficult Reply',
            type: 'challenge',
            instruction: {
              heading: 'Handle a Complaint Professionally',
              body: `A customer emailed:\n*"I've been waiting 2 weeks for my order and no one is responding to my emails. This is unacceptable!"*\n\nCreate a prompt template that:\n- Acknowledges frustration\n- Apologizes appropriately\n- Offers resolution\n- Is usable for ANY angry customer scenario`,
              tips: [
                'Include tone guidance (empathetic, solution-focused)',
                'Add variables for the specific issue and proposed resolution',
                'Keep it professional but human'
              ]
            },
            playground: {
              type: 'prompt-gym',
              promptChallenge: {
                initialMessage: "Create a template for responding to angry customers. Make it reusable for different complaints.",
                successResponse: "Well done! This template will help you respond to difficult situations quickly while maintaining professionalism and empathy.",
                hint: "Include variables like [CUSTOMER NAME], [ISSUE], [RESOLUTION OFFERED], and specify an empathetic tone.",
                gradingContext: {
                  goal: "Create a reusable prompt template for responding to customer complaints",
                  criteria: [
                    "Includes instruction to acknowledge the customer's frustration",
                    "Has a variable for the specific issue/complaint",
                    "Includes a resolution or next steps component",
                    "Specifies an empathetic, professional tone",
                    "Is generic enough to work for different complaints"
                  ],
                  exampleGoodPrompt: "Act as a customer service manager. Write a response to an upset customer about [ISSUE]. Structure: 1) Acknowledge their frustration sincerely, 2) Apologize for [SPECIFIC PROBLEM], 3) Explain resolution: [PROPOSED ACTION], 4) Offer [COMPENSATION IF APPLICABLE]. Tone: empathetic and solution-focused. Under 150 words."
                },
                validation: {
                  requiredKeywords: ['customer', '['],
                  minLength: 50
                }
              }
            }
          }
        ]
      },
      {
        id: 'les-2-3',
        moduleId: 'mod-2',
        slug: 'presentation-builder',
        title: 'Presentation Builder',
        description: 'From bullet points to slide decks in minutes',
        duration: '10 min',
        order: 3,
        steps: [
          {
            id: 'step-1',
            title: 'The Slide Deck Formula',
            type: 'concept',
            instruction: {
              heading: 'AI-Powered Presentations',
              body: `Stop staring at blank slides. Use this formula:\n\n**Input:** Your rough bullet points or topic\n**Output:** Complete slide outline with speaker notes\n\n**The Magic Prompt Structure:**\n1. Specify number of slides\n2. Define the story arc (Problem → Solution → Benefits)\n3. Request speaker notes\n4. Set the audience context\n\n**Bonus:** Ask for "visual suggestions" for each slide to guide your design.`,
              tips: [
                'Always specify your audience',
                'Request "1 key message per slide"',
                'Ask for transitions between slides'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'From Bullets to Full Deck'
              }
            }
          },
          {
            id: 'step-2',
            title: 'Challenge: Build a Pitch Deck',
            type: 'challenge',
            instruction: {
              heading: 'Create a 5-Slide Pitch',
              body: `You're presenting a new project to leadership. Create a prompt that generates:\n\n- 5-slide structure\n- Clear story arc\n- Speaker notes for each slide\n- Visual suggestions\n\nTopic: [You choose - make it relevant to your work]`,
              tips: [
                'Include the audience (leadership/executives)',
                'Specify time constraint (e.g., 10-minute presentation)',
                'Ask for "one key takeaway per slide"'
              ]
            },
            playground: {
              type: 'prompt-gym',
              promptChallenge: {
                initialMessage: "Create a prompt that generates a complete 5-slide pitch deck outline. Choose a topic relevant to your work.",
                successResponse: "Excellent! You now have a template that can generate presentation outlines for any topic. No more staring at blank slides!",
                hint: "Specify: number of slides, audience (leadership), request speaker notes and visual suggestions.",
                gradingContext: {
                  goal: "Create a prompt that generates a complete presentation outline with structure, notes, and visuals",
                  criteria: [
                    "Specifies number of slides (5)",
                    "Identifies the target audience",
                    "Requests a clear story structure or arc",
                    "Asks for speaker notes",
                    "Requests visual suggestions or design guidance"
                  ],
                  exampleGoodPrompt: "Create a 5-slide pitch deck outline for presenting [PROJECT/IDEA] to senior leadership. Structure: 1) Hook/Problem, 2) Current State, 3) Proposed Solution, 4) Benefits/ROI, 5) Next Steps/Ask. For each slide include: title, 3 bullet points, speaker notes (30 seconds each), and a visual suggestion. Presentation time: 10 minutes."
                },
                validation: {
                  requiredKeywords: ['slide', 'presentation'],
                  minLength: 50
                }
              }
            }
          }
        ]
      },
      {
        id: 'les-2-4',
        moduleId: 'mod-2',
        slug: 'report-generator',
        title: 'Report Generator',
        description: 'Create decision-ready documents fast',
        duration: '10 min',
        order: 4,
        steps: [
          {
            id: 'step-1',
            title: 'Reports That Drive Decisions',
            type: 'concept',
            instruction: {
              heading: 'The Executive Summary Formula',
              body: `Leaders don't have time to read everything. Structure reports for action:\n\n**The SCAR Format:**\n• **S**ituation - What's the context?\n• **C**hallenges - What problems exist?\n• **A**ctions - What do we recommend?\n• **R**esults - What outcomes do we expect?\n\n**Prompt Enhancement:**\nAdd "Include risks and mitigation strategies" for comprehensive reports.\nAdd "Format as executive summary with bullet points" for busy readers.`,
              tips: [
                'Always start with the recommendation',
                'Use bullet points, not paragraphs',
                'Include a "Next Steps" section with owners and dates'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'SCAR Report Framework'
              }
            }
          },
          {
            id: 'step-2',
            title: 'Challenge: Decision Document',
            type: 'challenge',
            instruction: {
              heading: 'Create a Recommendation Report',
              body: `Your team needs to decide between two vendors for a new software project.\n\nCreate a prompt that generates a decision document including:\n- Executive summary\n- Comparison criteria\n- Recommendation with reasoning\n- Risks and mitigations\n- Next steps`,
              tips: [
                'Use the SCAR format',
                'Ask for a comparison table',
                'Include clear recommendation at the top'
              ]
            },
            playground: {
              type: 'prompt-gym',
              promptChallenge: {
                initialMessage: "Create a prompt for generating a vendor comparison and recommendation document.",
                successResponse: "Great work! This template will help you create professional decision documents in minutes instead of hours.",
                hint: "Structure it with SCAR format: Situation, Challenges, Actions/Recommendations, Results. Include comparison criteria and risks.",
                gradingContext: {
                  goal: "Create a prompt for generating a professional vendor comparison and recommendation report",
                  criteria: [
                    "Asks for an executive summary or recommendation upfront",
                    "Includes comparison criteria or evaluation framework",
                    "Requests clear recommendation with reasoning",
                    "Asks for risks or considerations",
                    "Includes next steps or action items"
                  ],
                  exampleGoodPrompt: "Create a vendor decision document comparing [VENDOR A] vs [VENDOR B] for [PROJECT]. Include: 1) Executive summary with recommendation, 2) Comparison table across criteria: cost, features, implementation time, support, 3) Detailed pros/cons for each, 4) Risks and mitigations, 5) Recommended next steps with timeline. Format for executive review."
                },
                validation: {
                  requiredKeywords: ['vendor', 'recommendation'],
                  minLength: 50
                }
              }
            }
          }
        ]
      },
      {
        id: 'les-2-5',
        moduleId: 'mod-2',
        slug: 'prompt-chaining',
        title: 'Prompt Chaining',
        description: 'Connect multiple prompts for complex outputs',
        duration: '8 min',
        order: 5,
        steps: [
          {
            id: 'step-1',
            title: 'Chain Your Prompts',
            type: 'concept',
            instruction: {
              heading: 'When One Prompt Isn\'t Enough',
              body: `Complex tasks need multiple prompts working together:\n\n**Example Chain: Blog Post Creation**\n1. **Prompt 1:** "Generate 5 outline options for a blog about [TOPIC]"\n2. **Prompt 2:** "Expand outline #3 into a full draft with subheadings"\n3. **Prompt 3:** "Add a compelling introduction and conclusion"\n4. **Prompt 4:** "Create 3 social media posts to promote this article"\n\n**Why Chain?**\n• Better quality (focused prompts)\n• More control (review at each step)\n• Reusable components`,
              tips: [
                'Keep each prompt focused on one task',
                'Review output before the next step',
                'Save successful chains as workflows'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'Prompt Chaining Workflow'
              }
            }
          },
          {
            id: 'step-2',
            title: 'Challenge: Design a Chain',
            type: 'challenge',
            instruction: {
              heading: 'Create a Multi-Step Workflow',
              body: `Design a 3-step prompt chain for this task:\n\n**Goal:** Create a complete client proposal\n\nStep 1: ???\nStep 2: ???\nStep 3: ???\n\nWrite out all 3 prompts in sequence.`,
              tips: [
                'Think: Research → Draft → Polish',
                'Each step should have clear input/output',
                'Make step outputs feed into the next step'
              ]
            },
            playground: {
              type: 'prompt-gym',
              promptChallenge: {
                initialMessage: "Design a 3-step prompt chain for creating a client proposal. Write out all three prompts.",
                successResponse: "Brilliant! You've designed a powerful workflow. This chain approach ensures higher quality outputs than trying to do everything in one prompt.",
                hint: "Think in stages: 1) Gather requirements/outline, 2) Write the draft, 3) Polish and format. Write each prompt clearly.",
                gradingContext: {
                  goal: "Design a 3-step prompt chain for creating a client proposal",
                  criteria: [
                    "Includes 3 distinct steps or prompts",
                    "Steps follow a logical progression",
                    "First step involves planning or research",
                    "Middle step involves content creation",
                    "Final step involves review or polish",
                    "Steps connect logically (output of one feeds to next)"
                  ],
                  exampleGoodPrompt: "Step 1: \"Based on these client requirements [REQUIREMENTS], create a proposal outline with sections: Problem Statement, Our Solution, Timeline, Pricing, Terms.\"\n\nStep 2: \"Expand this outline into a full proposal draft. Each section should be 2-3 paragraphs. Use professional but approachable tone.\"\n\nStep 3: \"Review this proposal for: clarity, spelling/grammar, persuasiveness. Add an executive summary at the top and a clear call-to-action at the end.\""
                },
                validation: {
                  requiredKeywords: ['step', 'proposal'],
                  minLength: 80
                }
              }
            }
          },
          {
            id: 'step-3',
            title: 'Module 2 Complete! 🎉',
            type: 'recap',
            instruction: {
              heading: 'You\'re Building Real Skills!',
              body: `You've completed **Prompts That Work at Work**!\n\n**What you learned:**\n✅ Template thinking with variables\n✅ Professional email templates\n✅ Presentation builder prompts\n✅ Decision document generator\n✅ Prompt chaining for complex tasks\n\n**Your homework:**\nBuild ONE complete template for a task you do weekly.\n\n**Next up:** Module 3 - No-Code Quick Wins`,
              tips: [
                'Save your best templates immediately',
                'Share a template with a colleague',
                'Track time saved using your templates'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'Module 2 Complete!'
              }
            }
          }
        ]
      }
    ]
  },
  // MODULE 3: No-Code Quick Wins
  {
    id: 'mod-3',
    slug: 'no-code-quick-wins',
    title: 'No-Code Quick Wins',
    description: 'Build your first automation without writing code',
    stream: 'beginner',
    order: 3,
    icon: '⚡',
    duration: '45 min',
    learningOutcomes: [
      'Use a 5-point checklist to choose AI tools',
      'Build trigger → action → check automations',
      'Create enquiry auto-reply systems',
      'Track results with simple dashboards',
      'Implement cost caps and safety guardrails'
    ],
    lessons: [
      {
        id: 'les-3-1',
        moduleId: 'mod-3',
        slug: 'choosing-tools',
        title: 'Choosing the Right Tools',
        description: 'The 5-point checklist for AI tool selection',
        duration: '10 min',
        order: 1,
        steps: [
          {
            id: 'step-1',
            title: 'The Tool Selection Checklist',
            type: 'concept',
            instruction: {
              heading: 'Don\'t Just Pick the Popular One',
              body: `Before choosing an AI tool, run through this checklist:\n\n**The PRICE Check:**\n• **P**urpose - Does it solve YOUR specific problem?\n• **R**eliability - Is it stable? Good uptime?\n• **I**ntegration - Does it connect to your existing tools?\n• **C**ost - Fits your budget? Hidden fees?\n• **E**ase - Can your team actually use it?\n\n**Common Mistake:** Picking ChatGPT for everything when specialized tools exist.`,
              tips: [
                'Always do a trial before committing',
                'Check if free tier is sufficient for your needs',
                'Ask: "What happens if this tool disappears?"'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'The PRICE Tool Selection Framework'
              }
            }
          },
          {
            id: 'step-2',
            title: 'Challenge: Evaluate a Tool',
            type: 'challenge',
            instruction: {
              heading: 'Apply the PRICE Check',
              body: `Your boss wants to implement an AI writing assistant for the marketing team. They've heard about Jasper, Copy.ai, and ChatGPT.\n\nWrite a prompt that helps you create an evaluation framework using the PRICE criteria for comparing these tools.`,
              tips: [
                'Ask for a comparison table format',
                'Include specific questions for each criterion',
                'Request a recommendation structure'
              ]
            },
            playground: {
              type: 'prompt-gym',
              promptChallenge: {
                initialMessage: "Create a prompt that generates a PRICE-based evaluation framework for comparing AI writing tools for your marketing team.",
                successResponse: "Great! This systematic approach will help you make data-driven tool decisions instead of going with hype.",
                hint: "Reference the PRICE criteria (Purpose, Reliability, Integration, Cost, Ease) and ask for a comparison table format.",
                gradingContext: {
                  goal: "Create a prompt for evaluating AI tools using systematic criteria",
                  criteria: [
                    "References evaluation criteria or framework",
                    "Mentions specific tools to compare",
                    "Asks for structured output (table, comparison)",
                    "Considers the team context (marketing)",
                    "Includes practical evaluation factors"
                  ],
                  exampleGoodPrompt: "Create an evaluation matrix comparing Jasper, Copy.ai, and ChatGPT for a marketing team of 5. Evaluate each on: 1) Purpose fit for marketing content, 2) Reliability and uptime, 3) Integration with existing marketing tools, 4) Cost for team use, 5) Ease of adoption. Format as a comparison table with scores 1-5 and a final recommendation."
                },
                validation: {
                  requiredKeywords: ['compare', 'tool'],
                  minLength: 40
                }
              }
            }
          }
        ]
      },
      {
        id: 'les-3-2',
        moduleId: 'mod-3',
        slug: 'automation-basics',
        title: 'Automation Building Blocks',
        description: 'Trigger → Action → Check pattern',
        duration: '12 min',
        order: 2,
        steps: [
          {
            id: 'step-1',
            title: 'The TAC Pattern',
            type: 'concept',
            instruction: {
              heading: 'Every Automation Has Three Parts',
              body: `**T**rigger - What starts the automation?\n• New email arrives\n• Form submitted\n• Time-based (every Monday at 9am)\n\n**A**ction - What happens automatically?\n• Send a response\n• Create a task\n• Update a spreadsheet\n\n**C**heck - How do we verify quality?\n• Human review before sending\n• Error notifications\n• Audit logging\n\n**Real Example:**\n• Trigger: Customer fills contact form\n• Action: AI drafts personalized response\n• Check: Manager approves before sending`,
              tips: [
                'Always include a Check step for important automations',
                'Start simple - one trigger, one action',
                'Log everything for troubleshooting'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'The TAC Automation Pattern'
              }
            }
          },
          {
            id: 'step-2',
            title: 'Challenge: Design an Automation',
            type: 'challenge',
            instruction: {
              heading: 'Plan Your First Workflow',
              body: `Design an automation for this scenario:\n\n**Problem:** Your sales team gets 50+ enquiries daily via email. Response time is slow (24-48 hours) and replies are inconsistent.\n\nWrite a prompt that helps you design a TAC automation to solve this problem.`,
              tips: [
                'Consider the Trigger (new enquiry email)',
                'Define the Action (AI categorization + draft response)',
                'Don\'t forget the Check (human approval)'
              ]
            },
            playground: {
              type: 'prompt-gym',
              promptChallenge: {
                initialMessage: "Design a TAC automation for handling sales enquiries. Include all three components: Trigger, Action, Check.",
                successResponse: "Excellent! You've designed a real automation workflow. This pattern is the foundation of all business automation.",
                hint: "Structure your response around: What triggers it? What action does AI take? What check ensures quality?",
                gradingContext: {
                  goal: "Design a complete TAC automation workflow for handling sales enquiries",
                  criteria: [
                    "Clearly identifies the Trigger (new enquiry/email)",
                    "Defines specific Actions for AI to take",
                    "Includes a Check or verification step",
                    "Addresses the original problem (response time, consistency)",
                    "Is practical and implementable"
                  ],
                  exampleGoodPrompt: "Help me design a sales enquiry automation following the TAC pattern:\n\nTrigger: New email arrives in sales@company.com\n\nAction: 1) AI categorizes enquiry type (product, support, partnership), 2) Drafts appropriate response using our templates, 3) Creates a task in CRM\n\nCheck: Draft goes to sales rep for review before sending, rejected drafts are flagged for template improvement\n\nInclude error handling and logging requirements."
                },
                validation: {
                  requiredKeywords: ['trigger', 'action'],
                  minLength: 50
                }
              }
            }
          }
        ]
      },
      {
        id: 'les-3-3',
        moduleId: 'mod-3',
        slug: 'auto-reply-system',
        title: 'Building an Auto-Reply System',
        description: 'Your first real automation with AI',
        duration: '12 min',
        order: 3,
        steps: [
          {
            id: 'step-1',
            title: 'The Smart Auto-Reply',
            type: 'concept',
            instruction: {
              heading: 'Beyond "We\'ll Get Back To You"',
              body: `Generic auto-replies waste opportunities. Smart auto-replies:\n\n**Acknowledge** - Show you received their message\n**Categorize** - Identify what they need\n**Assist** - Provide immediate value\n**Timeline** - Set expectations\n\n**Example Flow:**\n1. Email arrives → AI reads and categorizes\n2. AI selects appropriate template\n3. AI personalizes with customer details\n4. Draft sent to queue for human review\n5. Approved → Sent | Rejected → Manual handling`,
              tips: [
                'Always include "A human will follow up" if needed',
                'Personalize with the sender\'s name at minimum',
                'Have a fallback for unrecognized enquiry types'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'Smart Auto-Reply Architecture'
              }
            }
          },
          {
            id: 'step-2',
            title: 'Challenge: Write Reply Categories',
            type: 'challenge',
            instruction: {
              heading: 'Create Category Templates',
              body: `Create a prompt that generates auto-reply templates for an IT support inbox.\n\nCategories needed:\n• Password reset request\n• Software installation request\n• Bug report\n• General question\n• Unknown/Other\n\nEach reply should acknowledge, assist, and set expectations.`,
              tips: [
                'Include placeholders for [NAME] and [TICKET NUMBER]',
                'Set different timelines for each category',
                'Have a human-review flag for complex cases'
              ]
            },
            playground: {
              type: 'prompt-gym',
              promptChallenge: {
                initialMessage: "Generate auto-reply templates for 5 IT support categories. Each should acknowledge, assist, and set timeline.",
                successResponse: "Perfect! These templates form the core of your auto-reply system. Add these to your automation and you'll handle enquiries 10x faster.",
                hint: "Define 5 categories with: automatic acknowledgment, helpful info or next steps, and expected response time.",
                gradingContext: {
                  goal: "Create auto-reply templates for different IT support categories",
                  criteria: [
                    "Covers multiple categories (password, software, bug, general, unknown)",
                    "Each reply acknowledges the request",
                    "Provides immediate helpful information",
                    "Sets clear timeline expectations",
                    "Uses variables/placeholders where appropriate"
                  ],
                  exampleGoodPrompt: "Create 5 auto-reply templates for IT support:\n\n1. Password Reset: Acknowledge, provide self-service link, timeline 2 hours\n2. Software Install: Acknowledge, link to request form, timeline 24 hours\n3. Bug Report: Thank them, confirm logging, timeline 4 hours for initial response\n4. General Question: Acknowledge, link to FAQ, timeline 24 hours\n5. Unknown: Thank them, confirm human review, timeline 4 hours\n\nInclude [NAME] and [TICKET#] placeholders. Professional but friendly tone."
                },
                validation: {
                  requiredKeywords: ['template', 'support'],
                  minLength: 50
                }
              }
            }
          }
        ]
      },
      {
        id: 'les-3-4',
        moduleId: 'mod-3',
        slug: 'safety-guardrails',
        title: 'Safety Guardrails',
        description: 'Cost caps, logging, and human oversight',
        duration: '8 min',
        order: 4,
        steps: [
          {
            id: 'step-1',
            title: 'Automation Safety Net',
            type: 'concept',
            instruction: {
              heading: 'Prevent Runaway Automations',
              body: `Automations can fail in expensive or embarrassing ways. Protect yourself:\n\n**Cost Controls:**\n• Set daily/monthly API limits\n• Alert when 80% of budget used\n• Hard stop at limit\n\n**Quality Controls:**\n• Human review for important outputs\n• Confidence thresholds (if AI is <80% sure → human review)\n• Random audit of automated actions\n\n**Logging:**\n• What triggered the automation\n• What action was taken\n• Who approved (if applicable)\n• Outcome/result`,
              tips: [
                'Start with lower limits, increase as you trust the system',
                'Always have an "off switch" for emergencies',
                'Review logs weekly during initial rollout'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'Automation Safety Checklist'
              }
            }
          },
          {
            id: 'step-2',
            title: 'Challenge: Create a Safety Plan',
            type: 'challenge',
            instruction: {
              heading: 'Design Guardrails for Auto-Reply',
              body: `For the IT support auto-reply system from the previous lesson, create a prompt that generates a comprehensive safety and monitoring plan.\n\nInclude:\n• Cost controls\n• Quality checks\n• Logging requirements\n• Rollback procedure`,
              tips: [
                'Think about what could go wrong',
                'Define clear escalation paths',
                'Set specific thresholds and limits'
              ]
            },
            playground: {
              type: 'prompt-gym',
              promptChallenge: {
                initialMessage: "Create a safety and monitoring plan for the IT support auto-reply automation. Cover costs, quality, logging, and rollback.",
                successResponse: "Excellent safety planning! This kind of thoughtful risk management is what separates successful automations from disasters.",
                hint: "Address: cost limits on AI API, when to require human review, what to log, and how to turn it off if something goes wrong.",
                gradingContext: {
                  goal: "Create comprehensive safety guardrails for an automation system",
                  criteria: [
                    "Includes cost controls or budget limits",
                    "Defines quality check mechanisms",
                    "Specifies logging requirements",
                    "Has a rollback or emergency stop procedure",
                    "Is practical and specific enough to implement"
                  ],
                  exampleGoodPrompt: "Create a safety plan for IT support auto-reply automation:\n\n1. Cost Controls: Max 100 AI calls/day, alert at 80, hard stop at limit\n2. Quality Checks: Human approval for replies >200 words, weekly random audit of 10 replies\n3. Logging: Log trigger, category detected, template used, approval status, send timestamp\n4. Rollback: One-click disable button, fallback to generic \"We've received your message\" template\n5. Escalation: If 3+ failures in 1 hour, auto-disable and alert IT manager"
                },
                validation: {
                  requiredKeywords: ['safety', 'log'],
                  minLength: 50
                }
              }
            }
          },
          {
            id: 'step-3',
            title: 'Module 3 Complete! 🎉',
            type: 'recap',
            instruction: {
              heading: 'You\'re Ready to Automate!',
              body: `You've completed **No-Code Quick Wins**!\n\n**What you learned:**\n✅ PRICE framework for tool selection\n✅ TAC pattern (Trigger → Action → Check)\n✅ Smart auto-reply systems\n✅ Safety guardrails and logging\n\n**Your homework:**\nIdentify ONE process at work that could use the TAC pattern.\n\n**Next up:** Module 4 - Your First Live Workflow (Capstone!)`,
              tips: [
                'Start with low-risk automations',
                'Document everything you build',
                'Get feedback from users before scaling'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'Module 3 Complete!'
              }
            }
          }
        ]
      }
    ]
  },
  // MODULE 4: Your First Live Workflow (Capstone)
  {
    id: 'mod-4',
    slug: 'first-live-workflow',
    title: 'Your First Live Workflow',
    description: 'Capstone: Build and ship a real AI workflow',
    stream: 'beginner',
    order: 4,
    icon: '🚀',
    duration: '40 min',
    learningOutcomes: [
      'Choose the right capstone project',
      'Design workflows with clear guardrails',
      'Test with dry runs and edge cases',
      'Measure impact with baselines',
      'Document and hand over workflows'
    ],
    lessons: [
      {
        id: 'les-4-1',
        moduleId: 'mod-4',
        slug: 'choose-your-project',
        title: 'Choose Your Project',
        description: 'Pick the right first automation to build',
        duration: '10 min',
        order: 1,
        steps: [
          {
            id: 'step-1',
            title: 'The FRS Filter',
            type: 'concept',
            instruction: {
              heading: 'Not All Tasks Are Worth Automating',
              body: `Choose your capstone project wisely using the FRS filter:\n\n**F**requency - How often does this happen?\n→ Daily/weekly tasks = better ROI\n→ Monthly/yearly = probably not worth it\n\n**R**epeatability - Is the process consistent?\n→ Same steps every time = easy to automate\n→ Lots of exceptions = hard to automate\n\n**S**afety - What if it goes wrong?\n→ Low stakes (internal) = good first project\n→ High stakes (customer-facing) = risky first project`,
              tips: [
                'Your first automation should be BORING',
                'Boring = predictable = successful',
                'Save complex automations for later'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'The FRS Project Filter'
              }
            }
          },
          {
            id: 'step-2',
            title: 'Challenge: Evaluate Your Ideas',
            type: 'challenge',
            instruction: {
              heading: 'Pick Your Capstone',
              body: `Create a prompt that helps you evaluate 3 potential automation projects using the FRS criteria.\n\nThink of 3 tasks YOU do regularly at work and include them in your prompt to get scored/ranked.`,
              tips: [
                'Be specific about YOUR actual tasks',
                'Include rough time estimates for each',
                'Ask for a recommendation with reasoning'
              ]
            },
            playground: {
              type: 'prompt-gym',
              promptChallenge: {
                initialMessage: "Use the FRS framework to evaluate 3 potential automation projects from your work. Get the AI to help you pick the best one to start with.",
                successResponse: "Great choice! Picking the right first project is half the battle. Now let's design it!",
                hint: "List 3 real tasks you do, ask AI to score each on Frequency (1-5), Repeatability (1-5), and Safety (1-5), then recommend which to automate first.",
                gradingContext: {
                  goal: "Use FRS criteria to evaluate and choose an automation project",
                  criteria: [
                    "Lists 3 specific tasks or projects",
                    "References the FRS criteria (Frequency, Repeatability, Safety)",
                    "Asks for scoring or comparison",
                    "Requests a recommendation",
                    "Tasks seem realistic and work-related"
                  ],
                  exampleGoodPrompt: "Evaluate these 3 tasks for automation potential using FRS (Frequency, Repeatability, Safety) scoring 1-5:\n\n1. Weekly status report compilation (takes 45 min every Monday)\n2. Customer feedback categorization (10-15 emails daily)\n3. Monthly invoice generation (once per month, 3 hours)\n\nScore each, explain reasoning, and recommend which to automate first and why."
                },
                validation: {
                  requiredKeywords: ['task', 'automate'],
                  minLength: 50
                }
              }
            }
          }
        ]
      },
      {
        id: 'les-4-2',
        moduleId: 'mod-4',
        slug: 'design-your-workflow',
        title: 'Design Your Workflow',
        description: 'Blueprint before you build',
        duration: '10 min',
        order: 2,
        steps: [
          {
            id: 'step-1',
            title: 'The Workflow Canvas',
            type: 'concept',
            instruction: {
              heading: 'Plan Before You Build',
              body: `Use this canvas to design your workflow:\n\n**1. WHAT**\n• Task name and description\n• Current time spent\n• Expected time after automation\n\n**2. FLOW**\n• Trigger: What starts it?\n• Steps: What happens in order?\n• Output: What's produced?\n\n**3. GUARDS**\n• Human checkpoints\n• Error handling\n• Rollback plan\n\n**4. METRICS**\n• How will you measure success?\n• Baseline measurement today\n• Target after 30 days`,
              tips: [
                'Write it out before touching any tools',
                'Share the canvas with a colleague for feedback',
                'Keep v1 simple - you can always iterate'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'Workflow Design Canvas'
              }
            }
          },
          {
            id: 'step-2',
            title: 'Challenge: Complete Your Canvas',
            type: 'challenge',
            instruction: {
              heading: 'Design Your Capstone Workflow',
              body: `Using the project you selected in the previous lesson, create a complete workflow canvas.\n\nCreate a prompt that helps you fill out all 4 sections:\n• WHAT\n• FLOW\n• GUARDS\n• METRICS`,
              tips: [
                'Be specific about your chosen task',
                'Include realistic time estimates',
                'Define at least 2 metrics to track'
              ]
            },
            playground: {
              type: 'prompt-gym',
              promptChallenge: {
                initialMessage: "Create a complete workflow canvas for your capstone automation project. Cover WHAT, FLOW, GUARDS, and METRICS.",
                successResponse: "You have a complete blueprint! This canvas will guide your build and help you explain the project to stakeholders.",
                hint: "Structure your prompt to fill in all 4 sections: What is the task and time savings? What's the flow? What guards are needed? How will you measure success?",
                gradingContext: {
                  goal: "Create a complete workflow design canvas for an automation project",
                  criteria: [
                    "Defines the WHAT (task, current time, expected time savings)",
                    "Maps the FLOW (trigger, steps, output)",
                    "Includes GUARDS (checkpoints, error handling, rollback)",
                    "Specifies METRICS (success measures, baseline, targets)",
                    "Is specific to a real or realistic task"
                  ],
                  exampleGoodPrompt: "Create a workflow canvas for automating weekly status report compilation:\n\nWHAT: Task description, currently takes 45 min, target 10 min with AI draft + review\n\nFLOW: Trigger (Monday 8am), Steps (pull data from 3 sources, AI drafts summary, I review and send), Output (email to manager)\n\nGUARDS: I review before sending, error alert if data source fails, manual fallback procedure\n\nMETRICS: Time spent, report quality rating, sent on time percentage. Baseline this week, target 80% time reduction."
                },
                validation: {
                  requiredKeywords: ['flow', 'metric'],
                  minLength: 80
                }
              }
            }
          }
        ]
      },
      {
        id: 'les-4-3',
        moduleId: 'mod-3',
        slug: 'test-and-launch',
        title: 'Test and Launch',
        description: 'Dry runs, edge cases, and go-live',
        duration: '10 min',
        order: 3,
        steps: [
          {
            id: 'step-1',
            title: 'Test Like It\'s Production',
            type: 'concept',
            instruction: {
              heading: 'The Testing Checklist',
              body: `Before going live, run these tests:\n\n**Dry Run**\n• Run the full workflow with fake data\n• Verify each step completes correctly\n• Check outputs match expectations\n\n**Edge Cases**\n• What if input is blank?\n• What if input is very long?\n• What if data source is unavailable?\n• What if AI gives a weird response?\n\n**Stakeholder Preview**\n• Show sample outputs to end users\n• Get feedback BEFORE going live\n• Adjust based on their input`,
              tips: [
                'Test with real data format but fake content',
                'Document every bug you find and fix',
                'Have someone else try to break it'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'Pre-Launch Testing Checklist'
              }
            }
          },
          {
            id: 'step-2',
            title: 'Challenge: Create Test Cases',
            type: 'challenge',
            instruction: {
              heading: 'Plan Your Tests',
              body: `For your capstone project, create a prompt that generates:\n\n• 3 dry run scenarios\n• 5 edge cases to test\n• A simple feedback form for stakeholder preview\n\nBe specific to YOUR project!`,
              tips: [
                'Think about what could go wrong',
                'Include both happy path and failure scenarios',
                'Make the feedback form simple - 3 questions max'
              ]
            },
            playground: {
              type: 'prompt-gym',
              promptChallenge: {
                initialMessage: "Generate test cases for your capstone automation: 3 dry runs, 5 edge cases, and a stakeholder feedback form.",
                successResponse: "Thorough testing plan! This preparation will ensure your launch goes smoothly.",
                hint: "Include normal scenarios (dry runs), unusual situations (edge cases), and a simple way to collect feedback from people who will use it.",
                gradingContext: {
                  goal: "Create a comprehensive testing plan for an automation project",
                  criteria: [
                    "Includes at least 3 dry run scenarios",
                    "Lists at least 5 edge cases or potential issues",
                    "Creates a simple feedback mechanism",
                    "Tests are specific to the project",
                    "Covers both success and failure scenarios"
                  ],
                  exampleGoodPrompt: "For my weekly status report automation, generate:\n\nDry Runs:\n1. Normal week with all data sources available\n2. Week with one project update missing\n3. Week with more than 10 project updates\n\nEdge Cases:\n1. What if a data source times out?\n2. What if a project name has special characters?\n3. What if the report is accidentally triggered twice?\n4. What if AI generates a 500-word summary instead of 100?\n5. What if it's a holiday and no updates exist?\n\nFeedback Form: 3 questions for my manager to rate the draft quality"
                },
                validation: {
                  requiredKeywords: ['test', 'edge case'],
                  minLength: 60
                }
              }
            }
          }
        ]
      },
      {
        id: 'les-4-4',
        moduleId: 'mod-4',
        slug: 'measure-and-improve',
        title: 'Measure and Improve',
        description: 'Track impact and iterate',
        duration: '8 min',
        order: 4,
        steps: [
          {
            id: 'step-1',
            title: 'What Gets Measured Gets Improved',
            type: 'concept',
            instruction: {
              heading: 'Track Your Impact',
              body: `Don't just build and forget. Measure these:\n\n**Time Metrics**\n• Time before automation (baseline)\n• Time after automation (actual)\n• Time saved per week/month\n\n**Quality Metrics**\n• Error rate before and after\n• User satisfaction scores\n• Number of manual interventions needed\n\n**Business Metrics**\n• Response time improvement\n• Throughput increase\n• Cost savings\n\n**Weekly Review**\n• What worked well?\n• What needs improvement?\n• What's the next iteration?`,
              tips: [
                'Start measuring BEFORE you launch (baseline)',
                'Simple spreadsheet tracking is fine',
                'Share wins with your team and manager'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'Impact Measurement Dashboard'
              }
            }
          },
          {
            id: 'step-2',
            title: 'Challenge: Create Your Scorecard',
            type: 'challenge',
            instruction: {
              heading: 'Build a Success Tracker',
              body: `Create a prompt that generates a simple scorecard for tracking your capstone project performance.\n\nInclude:\n• 3-5 key metrics\n• Baseline values (estimate or measure)\n• Target values (30 days from now)\n• Simple weekly check-in template`,
              tips: [
                'Keep it simple - spreadsheet is fine',
                'Focus on metrics YOU can actually track',
                'Include at least one quality metric, not just time'
              ]
            },
            playground: {
              type: 'prompt-gym',
              promptChallenge: {
                initialMessage: "Create a scorecard for tracking your automation's success. Include metrics, baselines, targets, and a weekly check-in template.",
                successResponse: "Excellent! This scorecard will help you prove ROI and identify improvements. Keep tracking weekly!",
                hint: "Define 3-5 specific metrics, set realistic targets for 30 days, and create a simple weekly review format.",
                gradingContext: {
                  goal: "Create a practical scorecard for measuring automation success",
                  criteria: [
                    "Defines 3-5 specific, measurable metrics",
                    "Includes baseline measurements or estimates",
                    "Sets target values with timeframe",
                    "Has a simple weekly check-in or review template",
                    "Metrics are relevant to the specific project"
                  ],
                  exampleGoodPrompt: "Create a scorecard for my weekly status report automation:\n\nMetrics:\n1. Time to complete (baseline: 45 min, target: 10 min)\n2. Report quality score from manager (baseline: n/a, target: 4/5)\n3. On-time delivery rate (baseline: 80%, target: 100%)\n4. Manual interventions needed (baseline: n/a, target: <2 per month)\n\nWeekly Check-in Template:\n- Time spent this week:\n- Issues encountered:\n- Manager feedback:\n- Improvement for next week:"
                },
                validation: {
                  requiredKeywords: ['metric', 'target'],
                  minLength: 50
                }
              }
            }
          },
          {
            id: 'step-3',
            title: 'Beginner Stream Complete! 🎓',
            type: 'recap',
            instruction: {
              heading: 'Congratulations, Graduate!',
              body: `You've completed the **entire Beginner Stream**!\n\n**Your Journey:**\n✅ Module 1: AI Foundations & Safety\n✅ Module 2: Prompt Templates & Chaining\n✅ Module 3: No-Code Automation Basics\n✅ Module 4: Live Workflow Capstone\n\n**You can now:**\n• Write effective prompts consistently\n• Build reusable templates\n• Design and deploy simple automations\n• Measure and improve your workflows\n\n**What's Next?**\nThe Intermediate Stream awaits with team scaling, governance, and advanced automation patterns.\n\n**Most importantly:** Keep using what you learned. Mastery comes from daily practice.`,
              tips: [
                'Launch your capstone this week',
                'Share your success with colleagues',
                'Start thinking about your next automation',
                'Consider the Intermediate Stream when ready'
              ]
            },
            playground: {
              type: 'visual',
              visual: {
                type: 'diagram',
                caption: 'Beginner Stream Complete! 🎓'
              }
            }
          }
        ]
      }
    ]
  }
];

// Helper to get a module by slug
export function getModuleBySlug(slug: string): Module | undefined {
  return beginnerCurriculum.find(m => m.slug === slug);
}

// Helper to get a lesson by module and lesson slug
export function getLesson(moduleSlug: string, lessonSlug: string): Lesson | undefined {
  const module = getModuleBySlug(moduleSlug);
  return module?.lessons.find(l => l.slug === lessonSlug);
}
