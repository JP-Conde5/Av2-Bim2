import {BottomTabNavigationProp, createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {ScreenTake, ScreenSelect} from '../screens'
import { Entypo } from '@expo/vector-icons'
import { colors } from '../styles/colors'

type TabParamList = {
    Selecionar: undefined,
    Camera: undefined
}
type TabScreenNavigationProp = BottomTabNavigationProp<TabParamList,'Selecionar'>
export type TabTypes ={
    navigation: TabScreenNavigationProp
}
export function TabNavigation(){
    const Tab = createBottomTabNavigator<TabParamList>() 
    return(
        <Tab.Navigator screenOptions={{
            tabBarActiveBackgroundColor: colors.secondary,
            tabBarInactiveBackgroundColor: colors.primary,
            tabBarActiveTintColor: colors.white,
            tabBarInactiveTintColor: colors.white,
            headerStyle: {backgroundColor: colors.primary},
            headerTintColor: colors.white
        }}>
            <Tab.Screen name='Selecionar' component={ScreenSelect} options={{
                tabBarIcon: ()=> (
                    <Entypo name="hand" size={24} color={colors.white}/>
                ),
            }}/>
            <Tab.Screen name='Camera' component={ScreenTake} options={{
                tabBarIcon: () => (
                    <Entypo name="camera" size={24} color={colors.white}/>
                )
            }}/>
        </Tab.Navigator>
    )
}