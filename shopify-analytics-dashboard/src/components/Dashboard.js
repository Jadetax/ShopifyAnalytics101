import React, { useState } from 'react';
import { Page, Layout, Card } from '@shopify/polaris';
import ChartComponent from './ChartComponent';
import Filters from './Filters'; // Make sure Filters component works as expected

const Dashboard = () => {
    const [filter, setFilter] = useState('all');

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    return (
        <Page title="Analytics Dashboard">
            <Layout>
                <Layout.Section>
                    <Filters onFilterChange={handleFilterChange} />
                </Layout.Section>
                <Layout.Section>
                    <Card title="Sales Data" sectioned>
                        <ChartComponent filter={filter} />
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

export default Dashboard;
