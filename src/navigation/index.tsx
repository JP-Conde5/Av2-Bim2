import { NavigationContainer } from "@react-navigation/native";
import { TabNavigation } from "./bottom.navigation" 

export function Navigation(){
    return(
        <NavigationContainer>
            <TabNavigation/>
        </NavigationContainer>
    );
}