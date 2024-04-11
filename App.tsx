/* eslint-disable no-eval */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import { TouchableOpacity, StyleSheet, Text, View, ScrollView } from 'react-native';
import Css from './styleSheet';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const App = () => {
  const [state, setState] = useState('0');
  const [isBrace, setisBrace] = useState(false);
  const op = state.slice(-1) === '+' || state.slice(-1) === '-' || state.slice(-1) === '.' || state.slice(-1) === '/' || state.slice(-1) === '%' || state.slice(-1) === '*';

  function numberHandel(value: string) {

    if (state === '0') {
      setState(value);
    } else {
      setState(state + value);
    }
    // console.log(value);
  }

  function opratorHandel(value: string) {

    if (value === 'clear') {
      setState('0');
    }
    else if ( state === 'Formate Error' ) {
          setState(value);
    }
    else if (value === '=') {
      try {


        if ((state.match(/\(/g) || []).length === (state.match(/\)/g) || []).length) {

            if (op){
              setState(eval(state.replace('()','(0)').slice(0,-1)).toString());
            }
            else {
              setState(eval(state.replace('()','(0)')).toString());
            }

        }
        else {
          console.log('brace not matching');
        }



      } catch (error) {
        setState('Formate Error');
      }
    }

    else if (value === '()') {
      if (state === '0') {
        setState('(');
        setisBrace(true);
      }
      else if (op) {

        setState(state + '(');
        setisBrace(true);

      } else {

        if (isBrace === true) {
          setState(state + ')');
          setisBrace(false);
        }
        else {
          setState(state + '(');
          setisBrace(true);
        }

      }
    }

    else if (value === 'C') {
      setState(state.slice(0, -1));
    }

    else if (op) {
      setState(state.slice(0, -1) + value);
    }

    else {
      setState(state + value);
    }
    // console.log(value);
  }

  function calculate({ value, work }: { value: string, work: string }) {
    if (work === 'number') {
      numberHandel(value);
      // setState(state + Number(value));
    }
    else if (work === 'oprater') {
      opratorHandel(value);
    }
  }

  function Button({ value, work, txt }: { value: string, work: string, txt: string }) {
    return (
      <TouchableOpacity style={[styles.btn]} onPress={() => { calculate({ value, work }); }} >
        <Text style={[Css.White, styles.text]} >{txt}</Text>
      </TouchableOpacity>
    );
  }

  function Btn({ btn }: {
    btn:
    {
      txt: string,
      value: string,
      work: string,
    }[]
  }) {
    return (
      <View style={[Css.j_around, Css.flex]} >
        {btn.map((i, index) => {
          return <Button key={index} value={i.value} work={i.work} txt={i.txt} />;
        })}
      </View>
    );
  }

  return (
    <View>
      <ScrollView style={[styles.top]} >
        <Text style={[styles.text,styles.display]}>{state.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}</Text>
      </ScrollView>
      <View style={[styles.bot, Css.j_around]} >
        <Btn btn={[
          {
            txt: 'AC',
            value: 'clear',
            work: 'oprater',
          },
          {
            txt: '( )',
            value: '()',
            work: 'oprater',
          },
          {
            txt: '%',
            value: ' %',
            work: 'oprater',
          },
          {
            txt: '/',
            value: '/',
            work: 'oprater',
          },
        ]} />
        <Btn btn={[
          {
            txt: '7',
            value: '7',
            work: 'number',
          },
          {
            txt: '8',
            value: '8',
            work: 'number',
          },
          {
            txt: '9',
            value: '9',
            work: 'number',
          },
          {
            txt: 'X',
            value: '*',
            work: 'oprater',
          },
        ]} />
        <Btn btn={[
          {
            txt: '4',
            value: '4',
            work: 'number',
          },
          {
            txt: '5',
            value: '5',
            work: 'number',
          },
          {
            txt: '6',
            value: '6',
            work: 'number',
          },
          {
            txt: '-',
            value: '-',
            work: 'oprater',
          },
        ]} />
        <Btn btn={[
          {
            txt: '1',
            value: '1',
            work: 'number',
          },
          {
            txt: '2',
            value: '2',
            work: 'number',
          },
          {
            txt: '3',
            value: '3',
            work: 'number',
          },
          {
            txt: '+',
            value: '+',
            work: 'oprater',
          },
        ]} />
        <Btn btn={[
          {
            txt: '0',
            value: '0',
            work: 'number',
          },
          {
            txt: '.',
            value: '.',
            work: 'oprater',
          },
          {
            txt: 'C',
            value: 'C',
            work: 'oprater',
          },
          {
            txt: '=',
            value: '=',
            work: 'oprater',
          },
        ]} />

      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  top: {
    height: hp('40%'),
    backgroundColor: 'grey',
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
  },
  bot: {
    height: hp('60%'),
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  display:{fontSize : 50},
  text: {
    fontSize: 30,
    color: 'white',
  },
  btn: {
    height: wp('20%'),
    width: wp('20%'),
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 50,
  },
});
