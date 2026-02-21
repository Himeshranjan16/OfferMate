
const now = new Date();

// Helper to create future/past dates
const addHours = (h) => new Date(now.getTime() + h * 60 * 60 * 1000).toISOString();

export const INITIAL_STUDENT = {
    name: "Aditya",
    cgpa: 8.5,
    skills: {
        dsa: 88,
        coding: 90,
        aptitude: 85,
        communication: 80
    },
    // Average calculation helper
    get avgSkill() {
        const { dsa, coding, aptitude, communication } = this.skills;
        return (dsa + coding + aptitude + communication) / 4;
    }
};

export const MOCK_COMPANIES = [
    {
        id: 1,
        name: "TechCorp",
        cgpa: 8.0,
        requiredSkill: 70,
        deadline: addHours(24), // 24 hours from now -> AT RISK
        applied: false,
        role: "Software Engineer",
        type: "Full Time"
    },
    {
        id: 2,
        name: "Innovate Solutions",
        cgpa: 7.5,
        requiredSkill: 60,
        deadline: addHours(72), // 3 days from now -> OPEN
        applied: true, // SAFE
        role: "Frontend Developer",
        type: "Internship"
    },
    {
        id: 3,
        name: "BigData Systems",
        cgpa: 9.0,
        requiredSkill: 85,
        deadline: addHours(-5), // 5 hours ago -> MISSED
        applied: false,
        role: "Data Analyst",
        type: "Full Time"
    },
    {
        id: 4,
        name: "Open AI",
        cgpa: 8.2,
        requiredSkill: 75,
        deadline: addHours(2), // 2 hours -> AT RISK
        applied: false,
        role: "AI Researcher",
        type: "Internship"
    },
    {
        id: 5,
        name: "Stripe Inc",
        cgpa: 6.0,
        requiredSkill: 50,
        deadline: addHours(120), // 5 days -> OPEN
        applied: false,
        role: "React Developer",
        type: "Full Time"
    },
    {
        id: 6,
        name: "Legacy Bank",
        cgpa: 7.0,
        requiredSkill: 60,
        deadline: addHours(-24), // Yesterday -> MISSED
        applied: false,
        role: "Java Developer",
        type: "Full Time"
    },
    {
        id: 7,
        name: "Cloud Nine",
        cgpa: 7.5,
        requiredSkill: 70,
        deadline: addHours(10), // 10 hours -> AT RISK
        applied: true, 
        role: "DevOps Engineer",
        type: "Full Time"
    }
];
