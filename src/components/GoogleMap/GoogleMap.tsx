import React, { useState, ReactElement } from 'react';
import parse from 'html-react-parser';
import styles from './GoogleMap.module.scss';
import { withScriptjs, withGoogleMap, GoogleMap as GoogleMapComponent, Marker } from 'react-google-maps';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';

interface MapProps {
    readonly isMarkerShown: boolean;
    readonly latitude: string;
    readonly longitude: string;
    readonly bubbleText: string;
}

interface TooltipProps {
    readonly text: string;
}

export const MapComponent = <div className={styles.map} />;
export const LoadingComponent = <div className={styles.loading} />;
export const ContainerComponent = <div className={styles.container} />;

const TooltipComponent = ({ text }: TooltipProps): ReactElement<TooltipProps, 'div'> | null => (
    <div className={styles.tooltip}>{parse(text)}</div>
);

export const GoogleMap = withScriptjs(
    withGoogleMap(({ isMarkerShown, bubbleText, latitude, longitude }: MapProps): ReactElement<
        MapProps,
        'div'
    > | null => {
        const [visible, setVisible] = useState(false);
        return (
            <div>
                <GoogleMapComponent defaultZoom={8} defaultCenter={{ lat: latitude, lng: longitude }}>
                    {isMarkerShown && (
                        <>
                            <Marker position={{ lat: latitude, lng: longitude }} onClick={() => setVisible(true)}>
                                {bubbleText && visible && (
                                    <InfoBox onCloseClick={() => setVisible(false)}>
                                        <TooltipComponent text={bubbleText} />
                                    </InfoBox>
                                )}
                            </Marker>
                        </>
                    )}
                </GoogleMapComponent>
            </div>
        );
    }),
);