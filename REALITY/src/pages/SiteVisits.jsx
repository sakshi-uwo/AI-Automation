import React from 'react';
import { Calendar, Users, MapPin, Phone, Clock, CaretLeft, CaretRight, Info } from '@phosphor-icons/react';
import './SiteVisits.css';

const SummaryCard = ({ icon: Icon, title, value }) => (
    <div className="card summary-card">
        <div className="icon-box">
            <Icon size={28} weight="bold" />
        </div>
        <div className="summary-info">
            <h3>{title}</h3>
            <div className="value">{value}</div>
        </div>
    </div>
);

const CalendarPreview = ({ visits = [] }) => {
    const [currentDate, setCurrentDate] = React.useState(new Date(2026, 1, 10)); // Feb 10, 2026
    const [selectedDate, setSelectedDate] = React.useState(10);
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const getMonthData = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();

        return { firstDay, daysInMonth, today, year, month };
    };

    const { firstDay, daysInMonth, today, year, month } = getMonthData(currentDate);

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleMonthChange = (e) => {
        setCurrentDate(new Date(year, parseInt(e.target.value), 1));
    };

    const handleYearChange = (e) => {
        setCurrentDate(new Date(parseInt(e.target.value), month, 1));
    };

    const isToday = (day) => {
        return currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear() &&
            day === today.getDate();
    };

    const getVisitsForDate = (day) => {
        const dateStr = `${currentDate.toLocaleDateString('en-US', { month: 'short' })} ${day}, ${year}`;
        return visits.filter(visit => visit.date === dateStr);
    };

    const hasVisits = (day) => {
        return getVisitsForDate(day).length > 0;
    };

    const handleDateClick = (day) => {
        setSelectedDate(day);
    };

    const selectedDateVisits = getVisitsForDate(selectedDate);

    const blanks = Array.from({ length: firstDay }, (_, i) => i);
    const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const years = Array.from({ length: 10 }, (_, i) => 2020 + i);

    return (
        <div className="card calendar-card">
            <div className="calendar-header">
                <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>Calendar</h2>
                <div style={{ display: 'flex', gap: '8px', color: 'var(--pivot-blue)' }}>
                    <CaretLeft size={18} weight="bold" style={{ cursor: 'pointer' }} onClick={previousMonth} />
                    <CaretRight size={18} weight="bold" style={{ cursor: 'pointer' }} onClick={nextMonth} />
                </div>
            </div>

            {/* Month and Year Selectors */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', justifyContent: 'center' }}>
                <select
                    value={month}
                    onChange={handleMonthChange}
                    style={{
                        padding: '6px 10px',
                        borderRadius: '8px',
                        border: '1px solid var(--glass-border)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        background: 'white',
                        outline: 'none'
                    }}
                >
                    {months.map((m, i) => (
                        <option key={i} value={i}>{m}</option>
                    ))}
                </select>
                <select
                    value={year}
                    onChange={handleYearChange}
                    style={{
                        padding: '6px 10px',
                        borderRadius: '8px',
                        border: '1px solid var(--glass-border)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        background: 'white',
                        outline: 'none'
                    }}
                >
                    {years.map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>

            <div className="calendar-grid">
                {days.map(day => (
                    <div key={day} className="calendar-day-label">{day}</div>
                ))}
                {blanks.map(blank => (
                    <div key={`blank-${blank}`} className="calendar-day blank"></div>
                ))}
                {dates.map(date => (
                    <div
                        key={date}
                        className={`calendar-day ${hasVisits(date) ? 'has-visit' : ''} ${isToday(date) ? 'today' : ''} ${selectedDate === date ? 'selected' : ''}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDateClick(date)}
                    >
                        {date}
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--pivot-blue-soft)', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px', color: 'var(--pivot-blue)' }}>
                    {selectedDate ? `${months[month]} ${selectedDate}, ${year}` : 'SELECT A DATE'}
                </h4>
                {selectedDateVisits.length > 0 ? (
                    <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                        {selectedDateVisits.map((visit, index) => (
                            <div key={visit.id} style={{ marginBottom: index < selectedDateVisits.length - 1 ? '6px' : '0' }}>
                                • {visit.time} - {visit.project}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ fontSize: '0.85rem', fontWeight: 500, opacity: 0.6 }}>
                        No site visits scheduled
                    </div>
                )}
            </div>
        </div>
    );
};

const SiteVisits = () => {
    const visits = [
        { id: 1, lead: 'Alice Thompson', project: 'Skyline Towers', date: 'Feb 10, 2026', time: '10:30 AM', executive: 'Sarah Jenkins', status: 'Scheduled', phone: '+1 (555) 123-4567', location: 'Section A, Floor 12', coordinates: '28.6139,77.2090' },
        { id: 2, lead: 'Mark Johnson', project: 'Green Valley', date: 'Feb 10, 2026', time: '02:00 PM', executive: 'Michael Chen', status: 'Scheduled', phone: '+1 (555) 987-6543', location: 'Clubhouse Entrance', coordinates: '28.5355,77.3910' },
        { id: 3, lead: 'Sarah Miller', project: 'Coastal Villas', date: 'Feb 10, 2026', time: '04:30 PM', executive: 'Sarah Jenkins', status: 'Scheduled', phone: '+1 (555) 234-5678', location: 'Villa 42 Site', coordinates: '19.0760,72.8777' },
        { id: 4, lead: 'Robert Davis', project: 'Skyline Towers', date: 'Feb 09, 2026', time: '11:00 AM', executive: 'Michael Chen', status: 'Completed', phone: '+1 (555) 345-6789', location: 'Sales Gallery', coordinates: '28.6139,77.2090' },
        { id: 5, lead: 'Emily Wilson', project: 'Oak Ridge', date: 'Feb 12, 2026', time: '09:30 AM', executive: 'Sarah Jenkins', status: 'Scheduled', phone: '+1 (555) 456-7890', location: 'Main Gate', coordinates: '12.9716,77.5946' },
        { id: 6, lead: 'James Brown', project: 'Green Valley', date: 'Feb 12, 2026', time: '03:15 PM', executive: 'Michael Chen', status: 'Rescheduled', phone: '+1 (555) 567-8901', location: 'Project Model', coordinates: '28.5355,77.3910' },
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case 'Scheduled': return 'status-scheduled';
            case 'Completed': return 'status-completed';
            case 'Rescheduled': return 'status-rescheduled';
            default: return '';
        }
    };

    const openMap = (coordinates, projectName) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${coordinates}`;
        window.open(url, '_blank');
    };

    return (
        <div className="site-visits-container">
            <header className="page-header">
                <h1>Upcoming Site Visits</h1>
                <p>Scheduled property visits and client meetings</p>
            </header>

            <div className="summary-row">
                <SummaryCard icon={Calendar} title="Total Upcoming Visits" value="24" />
                <SummaryCard icon={Clock} title="Today's Visits" value="3" />
                <SummaryCard icon={Users} title="This Week's Visits" value="12" />
            </div>

            <div className="main-content-grid">
                <div className="card visits-list-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Visit Schedule</h2>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--pivot-blue-soft)', background: 'white', fontSize: '0.85rem', fontWeight: 600, color: 'var(--charcoal)', cursor: 'pointer' }}>Filter</button>
                            <button style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: 'var(--pivot-blue)', color: 'white', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>Download Report</button>
                        </div>
                    </div>

                    <table className="visits-table">
                        <thead>
                            <tr>
                                <th>Lead Name</th>
                                <th>Project Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Assigned Executive</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'center' }}>Map</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visits.map((visit) => (
                                <tr key={visit.id} className="visit-row">
                                    <td style={{ fontWeight: 600 }}>{visit.lead}</td>
                                    <td>{visit.project}</td>
                                    <td>{visit.date}</td>
                                    <td>{visit.time}</td>
                                    <td>{visit.executive}</td>
                                    <td>
                                        <span className={`status-badge ${getStatusClass(visit.status)}`}>
                                            {visit.status}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button
                                            onClick={() => openMap(visit.coordinates, visit.project)}
                                            style={{
                                                background: 'var(--pivot-blue-soft)',
                                                border: 'none',
                                                borderRadius: '8px',
                                                padding: '8px 12px',
                                                cursor: 'pointer',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                color: 'var(--pivot-blue)',
                                                fontWeight: 600,
                                                fontSize: '0.75rem',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'var(--pivot-blue)';
                                                e.currentTarget.style.color = 'white';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'var(--pivot-blue-soft)';
                                                e.currentTarget.style.color = 'var(--pivot-blue)';
                                            }}
                                            title={`View ${visit.project} on map`}
                                        >
                                            <MapPin size={16} weight="bold" />
                                            Maps
                                        </button>
                                    </td>

                                    {/* Detail Preview Popover */}
                                    <div className="visit-preview-popover">
                                        <div className="preview-header">
                                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--pivot-blue-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--pivot-blue)' }}>
                                                <Users size={20} weight="bold" />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{visit.lead}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--charcoal)', opacity: 0.6 }}>Client Details</div>
                                            </div>
                                        </div>
                                        <div className="preview-body">
                                            <p><Phone size={16} color="var(--pivot-blue)" /> {visit.phone}</p>
                                            <p><MapPin size={16} color="var(--pivot-blue)" /> {visit.location}</p>
                                            <p><Info size={16} color="var(--pivot-blue)" /> Project: {visit.project}</p>
                                        </div>
                                    </div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <CalendarPreview />
            </div>

            {/* Abstract Background Element */}
            <div style={{
                position: 'fixed', bottom: '5%', right: '5%',
                width: '150px', height: '150px',
                background: 'linear-gradient(135deg, var(--pivot-blue-soft), transparent)',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                filter: 'blur(40px)', opacity: 0.3, zIndex: -1
            }}></div>
        </div>
    );
};

export default SiteVisits;
