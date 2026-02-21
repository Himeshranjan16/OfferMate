
import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertTriangle, XCircle, ChevronRight } from 'lucide-react';
import { calculateStatus, getStatusColor } from '../utils/statusLogic';
import './OpportunityCard.css';

const OpportunityCard = ({ company, student, onApply }) => {
    const [timeLeft, setTimeLeft] = useState('');
    const status = calculateStatus(student, company);

    // Calculate match percentage
    // Rules:
    // - SAFE / AT_RISK: 100%
    // - MISSED: 80-90%
    // - OPEN: Calculated based on requirements (75% baseline)

    let matchPercentage;

    if (status === 'SAFE' || status === 'AT_RISK') {
        matchPercentage = 100;
    } else if (status === 'MISSED') {
        // Generate a deterministic number between 80 and 90 based on company ID
        matchPercentage = 80 + (company.id % 11);
    } else {
        // OPEN or others - use logical calculation
        const cgpaRatio = student.cgpa / company.cgpa;
        const cgpaScore = Math.min(100, cgpaRatio * 75);

        const skillRatio = student.avgSkill / company.requiredSkill;
        const skillScore = Math.min(100, skillRatio * 75);

        matchPercentage = Math.round((cgpaScore * 0.6) + (skillScore * 0.4));
    }

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const deadline = new Date(company.deadline);
            const diff = deadline - now;

            if (diff <= 0) {
                setTimeLeft('Deadline Passed');
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);

            if (days > 0) {
                setTimeLeft(`${days}d ${hours}h remaining`);
            } else {
                setTimeLeft(`${hours}h ${minutes}m remaining`);
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 60000);
        return () => clearInterval(interval);
    }, [company.deadline]);

    const handleReasonClick = () => {
        let reason = "Unknown";
        if (status === "MISSED") {
            if (new Date(company.deadline) < new Date()) reason = "Deadline passed";
            else if (!company.applied) reason = "You did not apply in time";
        }
        alert(`Missed Reason: ${reason}. \n\nTip: Enable notifications to avoid missing future deadlines.`);
    };

    return (
        <div className={`opportunity-card ${status.toLowerCase()}`}>
            {/* 1. STATUS (Top Right) */}
            <div className="status-badge-wrapper">
                <span className={`status-badge ${getStatusColor(status)}`}>
                    {status.replace('_', ' ')}
                </span>
            </div>

            <div className="card-content">
                {/* 2. TIME LEFT (Big & Bold) */}
                <div className="time-left-section">
                    <Clock size={20} className={status === 'AT_RISK' ? 'text-amber-600' : 'text-gray-400'} />
                    <span className={`time-left-text ${status === 'AT_RISK' ? 'text-amber-700' : 'text-gray-800'}`}>
                        {timeLeft}
                    </span>
                </div>

                {/* 3. Company + Role */}
                <div className="company-info-section">
                    <h3 className="company-name">{company.name}</h3>
                    <span className="role-text">{company.role} • {company.type}</span>
                </div>

                {/* 4. Match % */}
                <div className="match-section">
                    <div className="match-bar-container">
                        <div className="match-text">
                            <span className="match-label">Match</span>
                            <span className={`match-value ${matchPercentage >= 80 ? 'text-green-600' : 'text-blue-600'}`}>
                                {matchPercentage}%
                            </span>
                        </div>
                        <div className="progress-bg">
                            <div
                                className={`progress-fill ${matchPercentage >= 80 ? 'bg-green-500' : 'bg-blue-500'}`}
                                style={{ width: `${matchPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Requirements (Small) */}
                <div className="requirements-preview">
                    <small>Req: {company.cgpa} CGPA | {company.requiredSkill} Skill</small>
                </div>
            </div>

            {/* 5. Action Button */}
            <div className="card-actions">
                {status === "MISSED" ? (
                    <button className="btn-outline-red" onClick={handleReasonClick}>
                        View Reason <ChevronRight size={16} />
                    </button>
                ) : status === "SAFE" ? (
                    <button className="btn-disabled" disabled>
                        <CheckCircle size={16} /> Applied
                    </button>
                ) : (
                    <button className="btn-primary" onClick={() => onApply(company.id)}>
                        Apply Now
                    </button>
                )}
            </div>
        </div>
    );
};

export default OpportunityCard;
