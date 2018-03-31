/* eslint-disable import/extensions */
import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import HorizontalTimeline from 'react-horizontal-timeline';

export default class HorizontalTimelineContent extends React.Component {
    static propTypes = {
        content: PropTypes.arrayOf(PropTypes.object).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            // previous: 0,
            // showConfigurator: false,

            // timelineConfig
            minEventPadding: 20,
            maxEventPadding: 120,
            linePadding: 100,
            labelWidth: 100,
            fillingMotionStiffness: 150,
            fillingMotionDamping: 25,
            slidingMotionStiffness: 150,
            slidingMotionDamping: 25,
            stylesBackground: '#0e131d',
            stylesForeground: '#89265e',
            stylesOutline: '#8a8a8a',
            isTouchEnabled: true,
            isKeyboardEnabled: true,
            isOpenEnding: true,
            isOpenBeginning: true,
        };
    }

    componentWillMount() {
        this.dates = this.props.content.map(entry => entry.date);
    }

    componentWillReceiveProps(nextProps) {
        this.dates = nextProps.content.map(entry => entry.date);
    }

    render() {
        const state = this.state;

        const views = this.props.content.map((entry, index) => (
            <div className="container" key={index}>
                {entry.component}
            </div>
        ));

        return (
            <div>
                <div
                    style={{
                        width: '70%',
                        height: '100px',
                        margin: '0 auto',
                        marginTop: '130px',
                        marginBottom: '70px',
                    }}
                >
                    <HorizontalTimeline
                        fillingMotion={{
                            stiffness: state.fillingMotionStiffness,
                            damping: state.fillingMotionDamping,
                        }}
                        index={this.state.value}
                        indexClick={index => {
                            this.setState({
                                value: index,
                                previous: this.state.value,
                            });
                        }}
                        isKeyboardEnabled={state.isKeyboardEnabled}
                        isTouchEnabled={state.isTouchEnabled}
                        labelWidth={state.labelWidth}
                        linePadding={state.linePadding}
                        maxEventPadding={state.maxEventPadding}
                        minEventPadding={state.minEventPadding}
                        slidingMotion={{
                            stiffness: state.slidingMotionStiffness,
                            damping: state.slidingMotionDamping,
                        }}
                        styles={{
                            background: state.stylesBackground,
                            foreground: state.stylesForeground,
                            outline: state.stylesOutline,
                        }}
                        values={this.dates}
                        isOpenEnding={state.isOpenEnding}
                        isOpenBeginning={state.isOpenBeginning}
                    />
                </div>
                <div className="text-center">
                    <SwipeableViews
                        index={this.state.value}
                        onChangeIndex={(value, previous) => {
                            this.setState({ value, previous });
                        }}
                        resistance
                    >
                        {views}
                    </SwipeableViews>
                </div>
            </div>
        );
    }
}
