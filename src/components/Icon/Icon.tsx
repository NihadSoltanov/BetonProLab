import React, { FC } from 'react';

import { Image, type ImageSourcePropType } from 'react-native';

export interface IconProps {
    size: number;
    name: ImageSourcePropType;
    borderRadius?: number;
    iconTint?: string;
}

export const Icon: FC<IconProps> = props => {
    return (
        <Image
            source={props.name}
            resizeMode="contain"
            style={{
                width: props.size,
                height: props.size,
                borderRadius: props.borderRadius,
                tintColor: props.iconTint,
            }}
        />
    );
};
