import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import Link from '../../../components/Link/Link';
import s from './Calculator.css';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomNumber: 0,
            roomType: '',
            roomStyle: 0,
            roomSize: 0,

            workProgress: 0,
            countProgress: 0,
            levelProgress: 0,

            updateFlag: 0,
        };
    }

    componentDidUpdate() {
        if (
            this.state.roomNumber !== 0 &&
            this.state.roomType !== '' &&
            this.state.roomSize !== 0 &&
            this.state.updateFlag === 1
        ) {
            if (this.state.roomStyle === '1') {
                this.setState({
                    workProgress: `${23}%`,
                    countProgress: `${22}%`,
                    levelProgress: `${67}%`,
                    updateFlag: 0,
                });
            } else if (this.state.roomStyle === '0') {
                this.setState({
                    workProgress: `${10}%`,
                    countProgress: `${54}%`,
                    levelProgress: `${87}%`,
                    updateFlag: 0,
                });
            } else {
                this.setState({
                    workProgress: `${6}%`,
                    countProgress: `${6}%`,
                    levelProgress: `${6}%`,
                    updateFlag: 0,
                });
            }
        }
    }

    changeRoomNumber(event) {
        this.setState({ roomNumber: event.target.value, updateFlag: 1 });
    }
    changeRoomType(event) {
        this.setState({ roomType: event.target.value, updateFlag: 1 });
    }
    changeRoomStyle(event) {
        this.setState({ roomStyle: event.target.value, updateFlag: 1 });
    }
    changeRoomSize(event) {
        this.setState({ roomSize: event.target.value, updateFlag: 1 });
    }

    render() {
        return (
            <div className={s.container}>
                <div />
                <div>
                    <form action="#" className={s.alt} method="POST">
                        <div className={`${s.row} ${s.uniform}`}>
                            <div className={s.formContainer}>
                                <select
                                    value={this.state.value}
                                    onChange={this.changeRoomNumber.bind(this)}
                                >
                                    <option disabled>
                                        Количество комнат
                                    </option>
                                    <option value={1}>1 комната</option>
                                    <option value={2}>2 комнаты</option>
                                    <option value={3}>3 комнаты</option>
                                    <option value={4}>4 комнаты</option>
                                </select>
                            </div>
                            <div className={s.formContainer}>
                                <select
                                    value={this.state.value}
                                    onChange={this.changeRoomType.bind(this)}
                                >
                                    <option disabled>
                                        Тип помещения
                                    </option>
                                    <option value="newBuilding">
                                        Новостройка
                                    </option>
                                    <option value="cottage">Котедж</option>
                                    <option value="secondary">
                                        Вторичный рынок
                                    </option>
                                    <option value="office">
                                        Офисное помещение
                                    </option>
                                </select>
                            </div>
                            <div className={s.formContainer}>
                                <select
                                    value={this.state.value}
                                    onChange={this.changeRoomStyle.bind(this)}
                                >
                                    <option disabled>
                                        Услуги дизайнера
                                    </option>
                                    <option value={1}>Требуются</option>
                                    <option value={0}>Не требуются</option>
                                </select>
                            </div>
                        </div>
                        <div className={s.formContainer}>
                            <input
                                name="name"
                                placeholder="Общая площадь, м2:"
                                type="text"
                                maxLength="3"
                                onChange={this.changeRoomSize.bind(this)}
                            />
                        </div>
                    </form>
                </div>
                <div>
                    <div
                        className={`${s.skillbar} ${s.clearfix}`}
                        data-percent="20%"
                    >
                        <div className={`${s.skillbarTitle}`}>
                            <span>Продолжительность работ</span>
                        </div>
                        <div
                            className={`${s.skillbarBar}`}
                            style={{ width: this.state.workProgress }}
                        />
                        <div className={`${s.skillBarPercent}`}>20%</div>
                    </div>

                    <div
                        className={`${s.skillbar} ${s.clearfix}`}
                        data-percent="25%"
                    >
                        <div className={`${s.skillbarTitle}`}>
                            <span>Сложность работ</span>
                        </div>
                        <div
                            className={`${s.skillbarBar}`}
                            style={{
                                background: '#3498db',
                                width: this.state.levelProgress,
                            }}
                        />
                        <div className={`${s.skillBarPercent}`}>25%</div>
                    </div>

                    <div className={s.skillbar} data-percent="50%">
                        <div className={`${s.skillbarTitle}`}>
                            <span>Стоимость работ</span>
                        </div>
                        <div
                            className={`${s.skillbarBar}`}
                            style={{ width: this.state.countProgress }}
                        />
                        <div className={`${s.skillBarPercent}`}>50%</div>
                    </div>
                    <h2>Цена за М2: 0</h2>
                </div>
                <div />
            </div>
        );
    }
}
export default withStyles(s)(Calculator);
