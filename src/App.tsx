import React, { useState } from 'react';
import { createMuiTheme, MuiThemeProvider, makeStyles, createStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import * as colors from "@material-ui/core/colors";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Counter } from './components/Counter';
import './App.css';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { events } from './data/events';

const darkTheme = createMuiTheme({
  typography: {
    fontSize: 20,
  },
  palette: {
    type: 'dark',
    primary: {
      // main: '#3e62ad',
      main: '#f39800',
    },
    secondary: colors.orange,
  },
});

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      '& .Link-root': {
        margin: theme.spacing(2),
        // width: '35ch',
      },
    },
  })
);

export type Event = {
  name: string, datetime: string,
}

export type ClassEvent = {
  kadai: Event[],
  submit: Event[],
  hubday: Event[],
}

interface AllEvents {
  [key: string]: ClassEvent;
}
export const App = () => {
  const params: keyof AllEvents = window.location.pathname.slice(1);
  console.log(params);
  const allEvents = events as AllEvents;
  const classEvents: ClassEvent = allEvents[params];

  const [countType, setCountType] = useState(0)

  const isCompleted = (events: Event[]): Event => {
    return events
      .filter(x => new Date(x.datetime).getTime() > new Date().getTime())
      .sort((a: Event, b: Event) => a.datetime > b.datetime ? 1 : -1)
    [0]
  }

  const classes = useStyles(darkTheme);

  return (
    <MuiThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className={classes.root}>
        {
          !classEvents
            ? ''
            : <Breadcrumbs aria-label="breadcrumb" className="Link-root">
              <Link
                color="inherit"
                onClick={() => { setCountType(0) }}
              >
                Hour
              </Link>
              <Link
                color="inherit"
                onClick={() => { setCountType(1) }}
              >
                Date
              </Link>
            </Breadcrumbs>
        }
        {
          !classEvents
            ? <p>404 Event Not Found...</p>
            :
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      component="th"
                      style={{ width: '30ch' }}
                    >
                      Content
                    </TableCell>
                    <TableCell
                      align="center"
                      component="th"
                      style={{ width: '30ch' }}
                    >
                      Limit
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    !isCompleted(classEvents.kadai)
                      ? <p style={{ textAlign: 'center' }}>KADAI is all completed...!</p>
                      : <Counter
                        event={isCompleted(classEvents.kadai)}
                        countType={countType}
                      />
                  }
                  {
                    !isCompleted(classEvents.submit)
                      ? <p style={{ textAlign: 'center' }}>Product is completed...!</p>
                      : <Counter
                        event={isCompleted(classEvents.submit)}
                        countType={countType}
                      />
                  }
                  {
                    !isCompleted(classEvents.hubday)
                      ? <p style={{ textAlign: 'center' }}>GGA is completed...!</p>
                      : <Counter
                        event={isCompleted(classEvents.hubday)}
                        countType={countType}
                      />
                  }
                </TableBody>
              </Table>
            </TableContainer>
        }
      </div>
    </MuiThemeProvider>
  );
}

// export default App;