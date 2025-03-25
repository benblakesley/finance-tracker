'use client';

import { Box, Tab, Tabs } from "@mui/material";

export const enum Timelines
{
    ThreeMonths = "3M",
    SixMonths = "6M",
    OneYear = "1Y",
    FiveYears = "5Y"
}

interface TimelineTabsProps
{
    timeline: Timelines;
    setTimeline: React.Dispatch<React.SetStateAction<Timelines>>;
}

export const TimelineTabs = ({timeline, setTimeline}: TimelineTabsProps) =>
{
    const onChange = (event: React.SyntheticEvent, newValue: Timelines) => {
        setTimeline(newValue);
    };

    return (
        <Box>
            <Tabs 
                value={timeline}
                centered
                onChange={onChange}
                sx={{
                "& .MuiTabs-indicator": {
                    backgroundColor: "#00FFFF", // Custom hex color for the indicator
                },
                "& .MuiTab-root": {
                    color: "#555", // Default text color
                },
                "& .MuiTab-root.Mui-selected": {
                    color: "#00FFFF", // Custom hex color for the selected tab
                },
            }}>
                <Tab label={Timelines.ThreeMonths} value={Timelines.ThreeMonths} />
                <Tab label={Timelines.SixMonths} value={Timelines.SixMonths} />
                <Tab label={Timelines.OneYear} value={Timelines.OneYear} />
                <Tab label={Timelines.FiveYears} value={Timelines.FiveYears} />
            </Tabs>
        </Box>
    )
}