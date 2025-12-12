import { BidTemplate, BidData } from '../types'

const STORAGE_KEY = 'bidTemplateData'

const defaultTemplates: BidTemplate[] = [
  {
    id: '1',
    name: 'Template 1 - Professional',
    content: `Hello.

<Job_description>
{jobDescription}
</Job_description>
Analyze the client's job description carefully and write your bid.
- The bid should be written in easy-to-read language so the client can easily understand it.
- Long sentences can be tedious for the client to read.
- It should not contain special characters or letters.
- The bid should be written in a friendly, informal, and easy-to-understand manner.
- It should not give the impression that it was written using AI tools.
- make a bid in code editor.
- my english level is B1.
Write your bid in the following format:

Just describe what you need to achieve through your project description simply.
Briefly describe myself with tech stack for this project.
Introduce your experience developing a similar project at my past project.
(include what client needed, what key aspect of this project is and how you achieved them.)
Describe the technology stack you will use for this project.
Explain your approach to this project in details.
Explain why you are a good fit for this project.
briefly describe the questions to ask clients for this project before starting development
Briefly describe milestone for this project.(less than four)`
  },
  {
    id: '2',
    name: 'Template 2 - Detailed',
    content: `Hello,

<Job_description>
{jobDescription}
</Job_description>

Analyze the client's job description carefully and write your bid.
- The bid should be written in easy-to-read language so the client can easily understand it.
- Long sentences can be tedious for the client to read.
- It should not contain special characters or letters.
- The bid should be written in a friendly, informal, and easy-to-understand manner.
- It should not give the impression that it was written using AI tools.
- make a bid in editor.
Write your bid in the following format:

State that you have just read and analyzed the project description and believe it falls within your scope, which is why you are writing your bid.
This is my proposal for this job.
Briefly describe myself with tech stack for this project.
Introduce your experience in this field (6 years of experience).
Explain two options for achieving these requirements(with tech stack and method).
write down the project Timeline and estimate budget to development this.(format -> Timeline: days, Budget: USD)
Conclude your bid with closing remarks.`
  }
]

export const getTemplates = (): BidTemplate[] => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      const data: BidData = JSON.parse(stored)
      return data.templates || defaultTemplates
    } catch {
      return defaultTemplates
    }
  }
  return defaultTemplates
}

export const saveTemplates = (templates: BidTemplate[]): void => {
  const data: BidData = { templates }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const generateBid = (template: BidTemplate, jobDescription: string): string => {
  return template.content.replace(/{jobDescription}/g, jobDescription)
}

