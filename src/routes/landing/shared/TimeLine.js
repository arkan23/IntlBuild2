import React, { Component } from 'react';
import s from './TimeLine.css';
import HorizontalTimelineContent from './HorizontalTimelineContent';
import GameInfo from './resources/content';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class TimeLine extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 0, previous: 0 };
    }

    componentWillMount() {
        this.data = GameInfo.map((game, index) => ({
            date: game.date,
            component: (
                <div key={index} style={{ textAlign: 'center' }}>
                    <h1>{`The Elder Scrolls ${index + 1}:`}</h1>
                    <h2>{game.subtitle}</h2>
                    <p>{game.content}</p>
                </div>
            ),
        }));
    }

    render() {
        return (
            <div className={s.container}>
                <HorizontalTimelineContent content={this.data} />
            </div>
        );
    }
}

export default withStyles(s)(TimeLine);
