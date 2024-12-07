import React, { useState } from 'react'

interface TabProps {
    title: string
    children: React.ReactNode
}

interface TabsProps {
    children: React.ReactElement<TabProps>[]
}

export const Tab: React.FC<TabProps> = ({ children }) => {
    return <div style={{ padding: '1rem 0' }}>{children}</div>
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0)

    const styles = {
        container: {
            margin: '1rem 0',
        },
        header: {
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '1px solid #e2e8f0',
            marginBottom: '1rem',
        },
        button: (isActive: boolean) => ({
            padding: '0.5rem 1rem',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem',
            borderBottom: `2px solid ${isActive ? '#3182ce' : 'transparent'}`,
            color: isActive ? '#3182ce' : 'inherit',
        }),
        tabPane: (isActive: boolean) => ({
            padding: '1rem 0',
            display: isActive ? 'block' : 'none',
        }),
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                {React.Children.map(children, (child, index) => (
                    <button
                        key={index}
                        style={styles.button(activeTab === index)}
                        onClick={() => setActiveTab(index)}
                    >
                        {child.props.title}
                    </button>
                ))}
            </div>
            <div>
                {React.Children.map(children, (child, index) => (
                    <div key={index} style={styles.tabPane(activeTab === index)}>
                        {child}
                    </div>
                ))}
            </div>
        </div>
    )
}