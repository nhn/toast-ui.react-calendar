/**
 * @fileoverview TOAST UI Calendar React wrapper component
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */
import React from 'react';
import TuiCalendar from 'tui-calendar';

export default class Calendar extends React.Component {
  rootEl = React.createRef();

  optionProps = [
    'disableDblClick',
    'isReadOnly',
    'month',
    'scheduleView',
    'taskView',
    'theme',
    'timeZone',
    'week'
  ];

  calendarInst = null;

  componentDidMount() {
    const {
      calendars = [],
      disableDblClick = false,
      isReadOnly = false,
      month = {},
      scheduleView = true,
      taskView = true,
      template = {},
      theme = {},
      timezones = [],
      useCreationPopup = true,
      useDetailPopup = true,
      view = 'week',
      week = {}
    } = this.props;

    this.calendarInst = new TuiCalendar(this.rootEl.current, {
      ...this.props,
      calendars,
      defaultView: view,
      disableDblClick,
      isReadOnly,
      month,
      scheduleView,
      taskView,
      template,
      theme,
      timezones,
      useCreationPopup,
      useDetailPopup,
      week
    });

    this.bindEventHandlers();

    const {schedules = []} = this.props;

    this.setCalendars(calendars);
    this.setSchedules(schedules);
  }

  shouldComponentUpdate(nextProps) {
    const {calendars, height, schedules, theme, view} = this.props;

    if (height !== nextProps.height) {
      this.getRootElement().style.height = height;
    }

    if (calendars !== nextProps.calendars) {
      this.setCalendars(nextProps.calendars);
    }

    if (schedules !== nextProps.schedules) {
      this.calendarInst.clear();
      this.setSchedules(nextProps.schedules);
    }

    if (theme !== nextProps.theme) {
      this.calendarInst.setTheme(this.cloneData(nextProps.theme));
    }

    if (view !== nextProps.view) {
      this.calendarInst.changeView(nextProps.view);
    }

    this.optionProps.forEach((key) => {
      if (this.props[key] !== nextProps[key]) {
        this.setOptions(key, nextProps[key]);
      }
    });

    return false;
  }

  componentWillUnmount() {
    this.unbindEventHandlers();
    this.calendarInst.destroy();
  }

  cloneData(data) {
    return JSON.parse(JSON.stringify(data));
  }

  setCalendars(calendars) {
    if (calendars && calendars.length) {
      this.calendarInst.setCalendars(calendars);
    }
  }

  setSchedules(schedules) {
    if (schedules && schedules.length) {
      this.calendarInst.createSchedules(schedules);
    }
  }

  setOptions(propKey, prop) {
    this.calendarInst.setOptions({[propKey]: prop});
  }

  getInstance() {
    return this.calendarInst;
  }

  getRootElement() {
    return this.rootEl.current;
  }

  bindEventHandlers() {
    Object.keys(this.props)
      .filter((key) => /on[A-Z][a-zA-Z]+/.test(key))
      .forEach((key) => {
        const eventName = key[2].toLowerCase() + key.slice(3);
        this.calendarInst.on(eventName, this.props[key]);
      });
  }

  unbindEventHandlers() {
    Object.keys(this.props)
      .filter((key) => /on[A-Z][a-zA-Z]+/.test(key))
      .forEach((key) => {
        const eventName = key[2].toLowerCase() + key.slice(3);
        this.calendarInst.off(eventName);
      });
  }

  render() {
    return <div ref={this.rootEl} style={{height: this.props.height || '100%'}} />;
  }
}
