import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";

export default function Bar() {

    return <StatusBar style="light" backgroundColor={theme.colors.background} />
}
