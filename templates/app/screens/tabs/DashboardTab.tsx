import {ScrollView, useWindowDimensions, View, StyleSheet} from "react-native";
import {BarChart, LineChart} from "react-native-gifted-charts";
import BFCard from "@/components/BFCard";
import {BFText} from "@/components/BFText";

const barData = [
    {value: 230, label: 'Jan', frontColor: '#4ABFF4'},
    {value: 180, label: 'Feb', frontColor: '#79C3DB'},
    {value: 195, label: 'Mar', frontColor: '#28B2B3'},
    {value: 250, label: 'Apr', frontColor: '#4ADDBA'},
    {value: 320, label: 'May', frontColor: '#91E3E3'},
    {value: 300, label: 'Jun', frontColor: '#4ABFF4'},
    {value: 350, label: 'Jul', frontColor: '#79C3DB'},
    {value: 400, label: 'Aug', frontColor: '#28B2B3'},
    {value: 390, label: 'Sep', frontColor: '#4ADDBA'},
    {value: 370, label: 'Oct', frontColor: '#91E3E3'},
    {value: 350, label: 'Nov', frontColor: '#4ABFF4'},
    {value: 300, label: 'Dec', frontColor: '#79C3DB'},
];

const lineData = [
    {value: 0, dataPointText: '0'},
    {value: 10, dataPointText: '10'},
    {value: 8, dataPointText: '8'},
    {value: 58, dataPointText: '58'},
    {value: 56, dataPointText: '56'},
    {value: 78, dataPointText: '78'},
    {value: 74, dataPointText: '74'},
    {value: 98, dataPointText: '98'},
];

const lineData2 = [
    {value: 0, dataPointText: '0'},
    {value: 20, dataPointText: '20'},
    {value: 18, dataPointText: '18'},
    {value: 40, dataPointText: '40'},
    {value: 36, dataPointText: '36'},
    {value: 60, dataPointText: '60'},
    {value: 54, dataPointText: '54'},
    {value: 85, dataPointText: '85'},
];

const DashboardTab = () => {
    const window = useWindowDimensions();
    const chartWidth = window.width - 120;

    return <View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <BFCard>
                <BFText>Welcome! You've successfully built and logged into your BlazeFast starter app. This screen contains a few sample charts and UI widgets. Visit the Firebase and Account tab for more boilerplate examples.</BFText>
            </BFCard>
            <BFCard>
                <BarChart
                    width={chartWidth}
                    showYAxisIndices
                    noOfSections={4}
                    maxValue={400}
                    data={barData}
                    isAnimated={true}
                />
            </BFCard>
            <BFCard>
                <LineChart
                    data={lineData}
                    data2={lineData2}
                    height={250}
                    width={chartWidth}
                    showVerticalLines
                    spacing={40}
                    initialSpacing={0}
                    color1="skyblue"
                    color2="orange"
                    textColor1="green"
                    dataPointsHeight={6}
                    dataPointsWidth={6}
                    dataPointsColor1="blue"
                    dataPointsColor2="red"
                    textShiftY={-2}
                    textShiftX={-5}
                    textFontSize={13}
                />
            </BFCard>
        </ScrollView>
    </View>
};

const styles = StyleSheet.create({
    scrollContent: {
        padding: 16,
        gap: 8,
    },
});

export default DashboardTab;
