import {LayoutAnimation} from "react-native";

export const animateLayout = () => {
    LayoutAnimation.configureNext(
        LayoutAnimation.create(
            100,
            LayoutAnimation.Types.linear,
            LayoutAnimation.Properties.scaleXY
        )
    )
};
