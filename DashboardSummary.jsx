
import React from 'react';
import { ShieldCheck, AlertTriangle, XCircle, Briefcase } from 'lucide-react';
import './DashboardSummary.css';

const SummaryCard = ({ title, count, type, icon: Icon }) => (
    <div className={`summary-card ${type}`}>
        <div className="icon-wrapper">
            <Icon size={24} />
        </div>
        <div className="summary-content">
            <span className="summary-count">{count}</span>
            <span className="summary-title">{title}</span>
        </div>
    </div>
);

const DashboardSummary = ({ stats }) => {
    return (
        <div className="dashboard-summary">
            <SummaryCard
                title="Safe Opportunities"
                count={stats.safe}
                type="safe"
                icon={ShieldCheck}
            />
            <SummaryCard
                title="At Risk"
                count={stats.atRisk}
                type="at-risk"
                icon={AlertTriangle}
            />
            <SummaryCard
                title="Missed"
                count={stats.missed}
                type="missed"
                icon={XCircle}
            />
            <SummaryCard
                title="Total Open"
                count={stats.open}
                type="open"
                icon={Briefcase}
            />
        </div>
    );
};

export default DashboardSummary;
