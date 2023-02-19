import * as React from "react";
import { useContext } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Styles } from "./styles/GlobalStyles";
import Button from "./Button";
import { myColors } from './styles/Colors';

export default function MyKeyboard() {
    const [number, setNumber] = React.useState("");
    const [firstNumber, setFirstNumber] = React.useState("");
    const [operation, setOperation] = React.useState("");
    const [result, setResult] = React.useState<Number | null>(null);

    const handleNumberPress = (buttonValue: string) => {
        if (result !== null) {
            clear();
        }
        if (number.length < 10) {
            setNumber(number + buttonValue);
            console.log("first button", number);
            console.log(" button value", buttonValue);
        }
    };
    const handleOperationPress = (buttonValue: string) => {
        setOperation(buttonValue);
        setFirstNumber(number);
        setNumber("");
    };
    const clear = () => {
        setNumber("");
        setFirstNumber("");
        setOperation("");
        setResult(null);

    };
    const clearNums = () => {
        setNumber("");
        setFirstNumber("");
        setOperation("");
    }

    const firstNumberDisplay = () => {
        if (result !== null) {
            return <Text style={result < 99999 ? [Styles.screenFirstNumber, { color: myColors.result }] : [Styles.screenFirstNumber, { fontSize: 50, color: myColors.result }]}>{result?.toString()}</Text>
        }
        if (number && number.length < 6) {
            return <Text style={Styles.screenFirstNumber}>{number}</Text>
        } if (number === "") {
            return <Text style={Styles.screenFirstNumber}>{"0"}</Text>
        } if (number.length > 5 && number.length < 8) {
            return (
                <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>{number}</Text>
            );
        }
        if (number.length > 7) {
            return (
                <Text style={[Styles.screenFirstNumber, { fontSize: 50 }]}>
                    {number}
                </Text>
            )
        }
    }

    const getResult = () => {

        console.log("first num", number);
        console.log("second num", firstNumber);
        switch (operation) {
            case "+":
                clear();
                setResult(parseInt(firstNumber) + parseInt(number));
                break;
            case "-":
                clear();
                setResult(parseInt(firstNumber) - parseInt(number));
                break;
            case "*":
                clear();
                setResult(parseInt(firstNumber) * parseInt(number));
                break;
            case "/":
                clear();
                setResult(parseInt(firstNumber) / parseInt(number));
                break;
            default:
                clear();
                setResult(0);
                break;
        }
    };
    return (
        <View style={Styles.viewBottom}>

            <View style={{


                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
                marginHorizontal: 10,
                flex: 0.25,


            }}>
                <Text style={Styles.screenSecondNumber}>
                    {firstNumber}
                    <Text style={{ color: "purple", fontSize: 50, fontWeight: '500' }}>{operation}</Text>

                </Text>
                {firstNumberDisplay()}
            </View>
            <View style={{ flex: 0.75 }}>


                <View style={Styles.row}>
                    <Button title="C" isGray onPress={clear} />
                    <Button title="+/-" isGray onPress={() => handleOperationPress("+/-")} />
                    <Button title="%" isGray onPress={() => handleOperationPress("%")} />
                    <Button title="/" isBlue onPress={() => handleOperationPress("/")} />
                </View>

                <View style={Styles.row}>
                    <Button title="7" onPress={() => handleNumberPress("7")} />
                    <Button title="8" onPress={() => handleNumberPress("8")} />
                    <Button title="9" onPress={() => handleNumberPress("9")} />
                    <Button title="x" isBlue onPress={() => handleOperationPress("*")} />
                </View>
                <View style={Styles.row}>
                    <Button title="4" onPress={() => handleNumberPress("4")} />
                    <Button title="5" onPress={() => handleNumberPress("5")} />
                    <Button title="6" onPress={() => handleNumberPress("6")} />
                    <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
                </View>
                <View style={Styles.row}>
                    <Button title="1" onPress={() => handleNumberPress("1")} />
                    <Button title="2" onPress={() => handleNumberPress("2")} />
                    <Button title="3" onPress={() => handleNumberPress("3")} />
                    <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
                </View>
                <View style={Styles.row}>
                    <Button title="." onPress={() => handleNumberPress(".")} />
                    <Button title="0" onPress={() => handleNumberPress("0")} />
                    <Button title="<=" onPress={() => setNumber(number.slice(0, -1))} />
                    <Button title="=" isBlue onPress={() => getResult()} />
                </View>
            </View>
        </View>
    )
}