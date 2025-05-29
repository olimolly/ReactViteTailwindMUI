import { Box } from "@mui/material";
import CircleProgressWithLabel from "./CircleProgress/CircleProgressWithLabel";
import { useProgressContext } from "../context/ProgressContext";

export default function CircleColumn({ labels, offset = 0, baseDelayIndex = 0 }: { labels: string[], offset?: number, baseDelayIndex?: number; }) {
    const { matchPerSlider } = useProgressContext();

    return (
        <Box
            sx={{
                flex: "1 1 auto",
                zIndex: 1,
                width: { xs: "100%", md: "auto" },
                height: { xs: "auto", md: "100vh" },
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                justifyContent: "space-evenly",
                alignItems: "center",
                alignSelf: "center",
                py: 4,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {labels.map((label, i) => (
                <CircleProgressWithLabel
                    key={label}
                    value={matchPerSlider[i + offset] || 0}
                    label={label}
                    delay={baseDelayIndex + i * 225} // 💡 300ms entre chaque cercle
                />
            ))}
        </Box>
    );
}
