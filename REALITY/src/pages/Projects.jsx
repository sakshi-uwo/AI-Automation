import React, { useState } from 'react';
import { Buildings, HouseLine, Tree, Waves, MapPin, Plus, X, CurrencyDollar, Calendar } from '@phosphor-icons/react';

const ProjectCard = ({ name, location, progress, units, available, status, icon: Icon, statusColor }) => (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0', padding: '0', overflow: 'hidden' }}>
        <div style={{ height: '180px', background: 'var(--pivot-blue-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Icon size={64} weight="thin" style={{ color: 'var(--pivot-blue-light)', opacity: 0.3 }} />
            <span style={{
                position: 'absolute', top: '15px', right: '15px', padding: '4px 12px', borderRadius: '20px',
                fontSize: '0.75rem', fontWeight: 600, background: 'rgba(255, 255, 255, 0.9)',
                color: statusColor, boxShadow: 'var(--shadow-elevation)'
            }}>
                {status}
            </span>
        </div>
        <div style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{name}</h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--charcoal)', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '1.2rem' }}>
                <MapPin size={16} />
                <span>{location}</span>
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px' }}>
                    <span>Construction Progress</span>
                    <span style={{ fontWeight: 600 }}>{progress}%</span>
                </div>
                <div style={{ height: '8px', background: 'var(--light-grey)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: 'var(--pivot-blue)', borderRadius: '4px' }}></div>
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', paddingTop: '1.2rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--charcoal)' }}>Total Units</span>
                    <div style={{ fontWeight: 600 }}>{units}</div>
                </div>
                <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--charcoal)' }}>Available</span>
                    <div style={{ fontWeight: 600 }}>{available}</div>
                </div>
            </div>
        </div>
    </div>
);

const AddProjectModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        priceRange: '',
        description: '',
        units: '',
        availableUnits: '',
        progress: 0,
        expectedCompletion: '',
        category: 'Planning',
        propertyType: 'Residential',
        icon: 'Buildings'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            name: '',
            location: '',
            priceRange: '',
            description: '',
            units: '',
            availableUnits: '',
            progress: 0,
            expectedCompletion: '',
            category: 'Planning',
            propertyType: 'Residential',
            icon: 'Buildings'
        });
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
        }} onClick={onClose}>
            <div
                className="card"
                style={{
                    maxWidth: '900px',
                    width: '100%',
                    padding: '0',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    background: '#f8f9fb'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    padding: '2rem 2.5rem',
                    background: 'white',
                    borderBottom: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: '#e8f0fe',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '12px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '48px',
                            height: '48px'
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 5L7.5 10L12.5 15" stroke="#0047AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0, marginBottom: '0.25rem', color: '#000' }}>Add New Project</h2>
                        <p style={{ fontSize: '0.9rem', color: 'var(--charcoal)', margin: 0 }}>Fill in the details to list a new real estate venture.</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                        {/* Project Name */}
                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: '#374151' }}>
                                <Buildings size={18} weight="duotone" />
                                Project Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Skyline Towers"
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    borderRadius: '10px',
                                    border: '1px solid #e5e7eb',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    background: '#fafafa',
                                    transition: 'all 0.2s ease'
                                }}
                            />
                        </div>

                        {/* Location and Price Range */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: '#374151' }}>
                                    <MapPin size={18} weight="duotone" />
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Downtown District"
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        borderRadius: '10px',
                                        border: '1px solid #e5e7eb',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        background: '#fafafa'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: '#374151' }}>
                                    <CurrencyDollar size={18} weight="duotone" />
                                    Price Range
                                </label>
                                <input
                                    type="text"
                                    name="priceRange"
                                    value={formData.priceRange}
                                    onChange={handleChange}
                                    placeholder="e.g., $500k - $1.2M"
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        borderRadius: '10px',
                                        border: '1px solid #e5e7eb',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        background: '#fafafa'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: '#374151' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                    <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Detail the project's features and amenities..."
                                rows="4"
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    borderRadius: '10px',
                                    border: '1px solid #e5e7eb',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    background: '#fafafa',
                                    fontFamily: 'inherit',
                                    resize: 'vertical'
                                }}
                            />
                        </div>

                        {/* Property Type and Status */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: '#374151' }}>
                                    <HouseLine size={18} weight="duotone" />
                                    Property Type
                                </label>
                                <select
                                    name="propertyType"
                                    value={formData.propertyType}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        borderRadius: '10px',
                                        border: '1px solid #e5e7eb',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        background: '#fafafa'
                                    }}
                                >
                                    <option value="Residential">Residential</option>
                                    <option value="Commercial">Commercial</option>
                                    <option value="Mixed-Use">Mixed-Use</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: '#374151' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                        <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    Status
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        borderRadius: '10px',
                                        border: '1px solid #e5e7eb',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        background: '#fafafa'
                                    }}
                                >
                                    <option value="Planning">Planning</option>
                                    <option value="Construction">Construction</option>
                                </select>
                            </div>
                        </div>

                        {/* Total Units and Available Units */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: '#374151', display: 'block' }}>
                                    Total Units
                                </label>
                                <input
                                    type="number"
                                    name="units"
                                    value={formData.units}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., 240"
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        borderRadius: '10px',
                                        border: '1px solid #e5e7eb',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        background: '#fafafa'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: '#374151', display: 'block' }}>
                                    Available Units
                                </label>
                                <input
                                    type="number"
                                    name="availableUnits"
                                    value={formData.availableUnits}
                                    onChange={handleChange}
                                    placeholder="e.g., 180"
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        borderRadius: '10px',
                                        border: '1px solid #e5e7eb',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        background: '#fafafa'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Construction Progress and Expected Completion */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: '#374151', display: 'block' }}>
                                    Construction Progress (%)
                                </label>
                                <input
                                    type="number"
                                    name="progress"
                                    value={formData.progress}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    max="100"
                                    placeholder="0"
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        borderRadius: '10px',
                                        border: '1px solid #e5e7eb',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        background: '#fafafa'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: '#374151' }}>
                                    <Calendar size={18} weight="duotone" />
                                    Expected Completion
                                </label>
                                <input
                                    type="date"
                                    name="expectedCompletion"
                                    value={formData.expectedCompletion}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        borderRadius: '10px',
                                        border: '1px solid #e5e7eb',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        background: '#fafafa',
                                        cursor: 'pointer'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '16px',
                            marginTop: '2rem',
                            borderRadius: '12px',
                            border: 'none',
                            background: '#0047AB',
                            color: 'white',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(0,71,171,0.3)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#003d99';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,71,171,0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#0047AB';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,71,171,0.3)';
                        }}
                    >
                        <Plus size={22} weight="bold" />
                        Build Project
                    </button>
                </form>
            </div>
        </div>
    );
};

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState([
        { name: 'Skyline Towers', location: 'Downtown District', progress: 85, units: 240, available: 36, status: '85% Done', icon: Buildings, statusColor: '#4CAF50', category: 'Construction' },
        { name: 'Green Valley Estate', location: 'Northwood Suburbs', progress: 42, units: 120, available: 68, status: '42% Done', icon: Tree, statusColor: '#ff9f4d', category: 'Construction' },
        { name: 'Oceanfront Villas', location: 'Coastal Bay', progress: 12, units: 45, available: 40, status: '12% Done', icon: Waves, statusColor: '#ff4d4d', category: 'Construction' },
        { name: 'The Nexus Hub', location: 'Tech Park South', progress: 0, units: 80, available: 'Concept', status: 'Planning', icon: HouseLine, statusColor: 'var(--charcoal)', category: 'Planning' },
    ]);

    const iconMap = {
        'Buildings': Buildings,
        'Tree': Tree,
        'Waves': Waves,
        'HouseLine': HouseLine
    };

    const handleAddProject = (formData) => {
        const newProject = {
            name: formData.name,
            location: formData.location,
            progress: parseInt(formData.progress) || 0,
            units: parseInt(formData.units),
            available: formData.availableUnits ? parseInt(formData.availableUnits) :
                (formData.category === 'Planning' ? 'Concept' : Math.floor(parseInt(formData.units) * 0.3)),
            status: formData.category === 'Planning' ? 'Planning' : `${formData.progress}% Done`,
            icon: Buildings, // Default to Buildings icon for simplicity
            statusColor: formData.category === 'Planning' ? 'var(--charcoal)' :
                (formData.progress > 70 ? '#4CAF50' : formData.progress > 30 ? '#ff9f4d' : '#ff4d4d'),
            category: formData.category
        };

        setProjects([...projects, newProject]);
        setIsModalOpen(false);
    };

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    const getFilterCount = (filter) => {
        if (filter === 'All') return projects.length;
        return projects.filter(p => p.category === filter).length;
    };

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Active Projects</h1>
                    <p style={{ color: 'var(--charcoal)', fontSize: '0.9rem', marginTop: '5px' }}>
                        Manage construction sites. Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {['All', 'Construction', 'Planning'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            style={{
                                background: activeFilter === filter ? 'var(--pivot-blue)' : 'var(--white)',
                                color: activeFilter === filter ? 'var(--white)' : 'var(--soft-black)',
                                border: '1px solid var(--glass-border)',
                                padding: '8px 16px',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                fontWeight: activeFilter === filter ? 700 : 500,
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                            onMouseEnter={(e) => {
                                if (activeFilter !== filter) {
                                    e.currentTarget.style.background = 'var(--pivot-blue-soft)';
                                    e.currentTarget.style.color = 'var(--pivot-blue)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (activeFilter !== filter) {
                                    e.currentTarget.style.background = 'var(--white)';
                                    e.currentTarget.style.color = 'var(--soft-black)';
                                }
                            }}
                        >
                            {filter}
                            <span style={{
                                padding: '2px 6px',
                                borderRadius: '10px',
                                fontSize: '0.7rem',
                                background: activeFilter === filter ? 'rgba(255,255,255,0.2)' : 'var(--pivot-blue-soft)',
                                color: activeFilter === filter ? 'white' : 'var(--pivot-blue)',
                                fontWeight: 700
                            }}>
                                {getFilterCount(filter)}
                            </span>
                        </button>
                    ))}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            background: 'var(--pivot-blue)',
                            color: 'white',
                            border: 'none',
                            padding: '10px 18px',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 2px 8px rgba(0,71,171,0.2)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#003d99';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,71,171,0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--pivot-blue)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,71,171,0.2)';
                        }}
                    >
                        <Plus size={20} weight="bold" />
                        Add Project
                    </button>
                </div>
            </div>

            {filteredProjects.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                    {filteredProjects.map((p, i) => <ProjectCard key={i} {...p} />)}
                </div>
            ) : (
                <div style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    background: 'var(--glass-bg)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--glass-border)'
                }}>
                    <Buildings size={64} weight="thin" color="var(--charcoal)" style={{ opacity: 0.3, marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>No projects found</h3>
                    <p style={{ color: 'var(--charcoal)', fontSize: '0.9rem' }}>Try selecting a different filter</p>
                </div>
            )}

            <AddProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddProject}
            />
        </div>
    );
};

export default Projects;
