export const schedule = [
  { day: 'monday', openingHour: '8:00 am', closingHour: '8:00 pm', closed: false },
  { day: 'tuesday', openingHour: '8:00 am', closingHour: '8:00 pm', closed: false },
  { day: 'wednessday', openingHour: '8:00 am', closingHour: '8:00 pm', closed: false },
  { day: 'thursday', openingHour: '8:00 am', closingHour: '8:00 pm', closed: false },
  { day: 'friday', openingHour: '8:00 am', closingHour: '8:00 pm', closed: false },
  { day: 'saturday', openingHour: '8:00 am', closingHour: '8:00 pm', closed: false },
  { day: 'sunday', openingHour: '8:30 am', closingHour: '8:00 pm', closed: false },
];


const currentDate = new Date(new Date().toDateString());
const tomorrow = new Date(currentDate);

const subsequentDays = [];
for (let i = 1; i < 6;) {
  i += 1;
  tomorrow.setDate(currentDate.getDate() + i);
  subsequentDays.push(tomorrow.toDateString());
}

const data = {
  asapTime: ['Tomorrow', 'As soon as possible (10-25 mins)'],
  sheduleTimeLists: [
    'ASAP',
    '7:00 AM - 7:30 AM',
    '7:30 AM - 8:00 AM',
    '8:00 AM - 8:30 AM',
    '8:30 AM - 9:00 AM',
    '9:00 AM - 9:30 AM',
    '9:30 AM - 10:00 AM',
    '10:00 AM - 10:30 AM',
    '10:30 AM - 11:00 AM',
    '11:00 AM - 11:30 AM',
    '11:30 AM - 12:00 PM',
    '12:00 PM - 12:30 PM',
    '12:30 PM - 1:00 PM',
    '1:00 PM - 1:30 PM',
    '1:30 PM - 2:00 PM',
    '2:00 PM - 2:30 PM',
    '2:30 PM - 3:00 PM',
    '3:00 PM - 3:30 PM',
    '3:30 PM - 4:00 PM',
    '4:00 PM - 4:30 PM',
    '4:30 PM - 5:00 PM',
    '5:00 PM - 5:30 PM',
    '5:30 PM - 6:00 PM',
    '6:00 PM - 6:30 PM',
    '6:30 PM - 7:00 PM',
    '7:00 PM - 7:30 PM',
    '7:30 PM - 8:00 PM'
  ],
  durationList: [
    'Today',
    'Tomorrow',
    ...subsequentDays,
  ]
};


const { sheduleTimeLists, durationList } = data;

export const scheduleData = [
  {
    time: 'Today',
    selector: 'day',
    options: [...durationList]
  },
  {
    time: '1:00 - 1:30',
    selector: 'time',
    options: [...sheduleTimeLists]
  }
];


export default data;
