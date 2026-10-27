import { LINKED_PAGES } from "../../guideConfig";
import type { GuideRecord } from "../../guideTypes";
import { FOUNDATIONS_SOURCES } from "../../foundations/foundationsSources";
import { PRACTITIONER_SOURCES as SOURCES } from "../practitionerSources";

export const resumeAndInterviewsWithAi: GuideRecord = {
  slug: "ai-resume-and-interview-prep",
  number: 11,
  level: "practitioner",
  kind: "guide",
  title: "How to write a resume and prepare for interviews with AI",
  metaDescription:
    "Use AI to tighten your real experience, match a job posting, and practise interview answers, while avoiding invented claims, privacy leaks and fake job offers.",
  cardSummary: "Tighten real experience, match a job posting, practise answers and avoid job scams.",
  summaryPoints: [
    "Use AI to organise and sharpen facts you supply. Never let it invent a job, a skill, a result or a qualification. You will be asked about every line.",
    "A survey reported by the U.S. Chamber of Commerce suggests many hiring managers are wary of AI-written applications, so edit everything into your own voice.",
    "Rehearse with AI before the interview. Do not use it live unless the employer says that is allowed.",
    "Keep ID numbers and your full home address out of prompts, and be careful with job offers that ask for money or sensitive details early.",
  ],
  sections: [
    {
      id: "employers-views",
      heading: "What employers say about AI-written applications",
      paragraphs: [
        "A survey of 600 U.S. hiring managers by the resume company TopResume, reported by the U.S. Chamber of Commerce in August 2025, found mixed attitudes. Nearly 20% said they would reject a candidate who used an AI-generated resume or cover letter, and another 20% saw relying on AI as a red flag. About 52% accepted AI for proofreading or drafting support but wanted the final product to be human-produced. Of the managers, 33.5% said they could spot an AI-created resume within about 20 seconds, and 57% said interview-assistance tools should never be used.",
        "This is a vendor survey, so treat it as a signal rather than a measurement of every employer. It is still a useful warning. The safest approach is to use AI as an editor of your own material, so the finished document is accurate and sounds like you.",
      ],
      sourceIds: [SOURCES.topResumeSurveyViaChamber.id],
    },
    {
      id: "what-ai-can-do",
      heading: "What AI can do for a resume, and what only you can supply",
      table: {
        caption: "Resume jobs, split between you and the AI",
        columns: ["Part of the resume", "AI can help with", "You must supply"],
        rows: [
          ["Work bullets", "Stronger verbs, clearer structure, shorter lines", "What you actually did and the real results"],
          ["Summary at the top", "Tightening three or four honest sentences", "The facts about your experience and goals"],
          ["Skills list", "Grouping and ordering by relevance to a posting", "Only skills you can discuss and demonstrate"],
          ["Tailoring to a job", "Showing which posting requirements your evidence already meets", "Evidence for each match, and honesty about gaps"],
          ["Cover letter", "Turning your three points into a clean draft", "Why this employer and this role, in your own words"],
        ],
      },
    },
    {
      id: "resume-steps",
      heading: "A resume workflow that stays truthful",
      steps: [
        {
          title: "Collect your facts first",
          detail: "List each role with dates, what you were responsible for and any results you can honestly state, such as time saved, customers served or errors reduced. Leave your home address, phone number and ID numbers out of what you paste. Add contact details to the final document yourself.",
        },
        {
          title: "Match the posting to your evidence",
          detail: "Paste the public job posting and your facts, and ask which requirements you meet, with the evidence for each, and which you do not. The gaps are as useful as the matches.",
        },
        {
          title: "Rewrite bullets from facts only",
          detail: "Ask for a clear action, what you did and the result, using only the facts you supplied. Tell it to write not stated when information is missing rather than inventing a figure.",
        },
        {
          title: "Check every line against reality",
          detail: "For each bullet ask whether you could explain it for five minutes in an interview. Delete anything inflated, and anything you cannot support.",
        },
        {
          title: "Rewrite until it sounds like you",
          detail: "Generic phrases such as “results-driven professional” add nothing. Replace them with specific detail from your work.",
        },
        {
          title: "Proofread and save a plain version",
          detail: "Read it out loud, check dates and spellings, and save a simple text-based file so the content is easy for software and people to read.",
        },
      ],
    },
    {
      id: "interview-practice",
      heading: "Practise interviews with AI",
      bullets: [
        "Ask for likely questions based on the job posting, grouped by theme such as experience, skills, behaviour and motivation.",
        "Run a mock interview with one question at a time. Answer out loud first, then type or paste your answer for feedback.",
        "Build short stories from your real experience using a simple structure: the situation, the task, what you did and the result. Ask the AI to point out where your story is vague, not to write it.",
        "Practise honest answers to difficult questions, such as a gap in your work history or why you are leaving a job.",
        "Prepare two or three questions of your own to ask the interviewer. Ask the AI to suggest areas, then choose the ones you really want answered.",
      ],
      paragraphs: [
        "Using AI live during an interview is a different matter. In the survey above, 57% of hiring managers said interview-assistance tools should never be used. Unless the employer tells you otherwise, rehearse with AI and then go into the interview on your own.",
      ],
      sourceIds: [SOURCES.topResumeSurveyViaChamber.id],
    },
    {
      id: "scams-and-privacy",
      heading: "Job scams and privacy",
      paragraphs: [
        "The U.S. Federal Trade Commission warns about fake job opportunities, including phony business opportunities, work-at-home scams, shady employment agencies and scammy multi-level marketing schemes. It asks people to report suspected job scams at ReportFraud.ftc.gov.",
        "AI makes fake offers easier to write, so a polished message is not evidence that it is real. Check the company on its official website, find a contact method yourself rather than replying to the message, and be wary of anything that asks for money, ID numbers or bank details before you are hired.",
        "The same privacy rule that applies to chatbots applies here: the UK National Cyber Security Centre advises against putting sensitive information in queries to public chatbots. Your resume needs only the details you would put on a public profile.",
      ],
      sourceIds: [SOURCES.ftcJobScams.id, FOUNDATIONS_SOURCES.ncscChatbots.id],
    },
  ],
  prompts: [
    {
      id: "match-posting",
      group: "Resume",
      title: "Match a posting to my evidence",
      whenToUse: "Before you tailor a resume. Use the public job posting and your own notes.",
      text: "Here is a job posting: [paste posting]. Here are facts about my experience: [your notes]. List each requirement in the posting, say whether my notes show evidence for it, and quote the evidence. List the requirements I do not clearly meet. Do not add any experience I have not given you.",
    },
    {
      id: "rewrite-bullets",
      group: "Resume",
      title: "Rewrite my bullet points",
      whenToUse: "To improve wording without changing facts.",
      text: "Rewrite each of these resume bullets to start with a strong verb, say what I did and show the result. Use only the facts given. If a result is missing, write [add result] instead of inventing one. Bullets: [your bullets]",
    },
    {
      id: "summary-statement",
      group: "Resume",
      title: "Draft a short summary",
      whenToUse: "For the top of your resume.",
      text: "Using only these facts, write three honest sentences for the top of my resume: [role you want], [years and areas of experience], [two or three real strengths]. Avoid buzzwords and do not claim anything I have not listed.",
    },
    {
      id: "mock-interview",
      group: "Interview",
      title: "Mock interview",
      whenToUse: "For practice before an interview.",
      text: "Act as an interviewer for a [job title] role at a [type of organisation]. Ask me one question at a time, starting with an easy one. After each answer, give me two things I did well and one thing to improve, then ask the next question. Use this posting to choose questions: [paste posting]",
    },
    {
      id: "story-builder",
      group: "Interview",
      title: "Sharpen a story from my experience",
      whenToUse: "To prepare examples for behavioural questions.",
      text: "Here is an example from my work, written in my own words: [your example]. Ask me up to five questions about the situation, my task, my actions and the result. Then show me where the story is vague. Do not rewrite it or add details I did not give you.",
    },
    {
      id: "gap-answer",
      group: "Interview",
      title: "Practise an honest answer about a gap or a move",
      whenToUse: "For a career gap, a short role, or a career change.",
      text: "I need to explain [gap, short role or career change]. The honest reason is: [your reason]. Help me say this in three calm sentences that are true, focus on what I learned or did next, and do not blame anyone.",
    },
  ],
  whatCanGoWrong: [
    "A made-up or inflated claim that the interviewer asks about. It can cost you the offer, or the job later if it is discovered.",
    "A resume full of generic phrases that sounds like every other AI-assisted resume.",
    "Giving a job scammer your ID numbers or bank details because the message looked professional.",
    "Pasting your full contact details or other people's information into a chatbot.",
    "Relying on a vendor survey as if it described every employer. Policies and attitudes differ.",
  ],
  limitsNote:
    "This is general career-preparation guidance. Employers set their own rules on AI in applications, so read each posting's instructions and follow them.",
  sources: [SOURCES.topResumeSurveyViaChamber, SOURCES.ftcJobScams, FOUNDATIONS_SOURCES.ncscChatbots],
  relatedSlugs: ["ai-for-email-and-writing-at-work", "fact-check-ai-answers", "ai-scams-and-deepfakes"],
  relatedLinks: [LINKED_PAGES.safetyChecklist, LINKED_PAGES.promptLibrary],
  lastReviewed: "2026-10-27",
  published: true,
};
