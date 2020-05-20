import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {duration} from 'moment';
interface Props {}

interface State {
    milliSeconds,
}
export default class Timer extends Component<Props, State> {
    interval
    constructor(props) {
        super(props)

        this.state = {
            milliSeconds: 3600000,
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    static getDerivedStateFromError(error) {
        console.log(error)
    }

    formatTime = (milliSeconds) => {
        const durationFromMilliseconds = duration(milliSeconds)
        return `${
            durationFromMilliseconds.hours() ? durationFromMilliseconds.hours() >= 10 ? durationFromMilliseconds.hours() + ':' : `0${durationFromMilliseconds.hours()}:` : ''
        }${
            durationFromMilliseconds.minutes() >= 10 ? durationFromMilliseconds.minutes() + ':' : `0${durationFromMilliseconds.minutes()}:` 
        }${
            durationFromMilliseconds.seconds() >= 10 ? durationFromMilliseconds.seconds() : `0${durationFromMilliseconds.seconds()}` 
        }`
    }
    
    pause = () => {
        clearInterval(this.interval)
    }

    start = () => {
        clearInterval(this.interval)
        this.interval = setInterval(()=>{ 
            if (this.state.milliSeconds === 0) {
                clearInterval(this.interval)
            } else {
                this.setState({
                    milliSeconds: this.state.milliSeconds - 1000
                })
            }
        },1000)
    }

    reset = () => {
        clearInterval(this.interval)
        this.setState({
            milliSeconds: 90000
        })
    }

    render() {
        return (
            <View>
                <View style={styles.timerContainer}>
                    <Text style={styles.text}>{this.formatTime(this.state.milliSeconds)}</Text>
                </View>
                <View>
                    <Button onPress={this.pause} title="pause"><Text style={styles.button}>pause</Text></Button>
                    <Button onPress={this.start} title="start"><Text style={styles.button}>start</Text></Button>
                    <Button onPress={this.reset} title="reset"><Text style={styles.button}>reset</Text></Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text:{
        fontSize: 50
    },
    timerContainer:{
        width: '100%',
        aspectRatio: 1,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#505050',
        borderWidth: 1,
        borderRadius: 250,
        backgroundColor: '#e5e5e5',
    },
    button: {
        borderColor: '#505050',
        borderWidth: 1,
        padding: 15,
    }
})