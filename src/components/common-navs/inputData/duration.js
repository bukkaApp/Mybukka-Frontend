const currentDate = new Date(new Date().toDateString());
const tomorrow = new Date(currentDate);

const subsequentDays = [];
for (let i = 1; i < 6;) {
  i += 1;
  tomorrow.setDate(currentDate.getDate() + i);
  subsequentDays.push(tomorrow.toDateString());
}

export default {
  categoryItems: [
    '*Price May Vary By Location*',
    'Brewed Coffee',
    'Cold Brew and Iced Coffee',
    'Chocolate Beverages',
    'Espresso Drinks',
    'Iced Tea',
    'Frappuccino',
    'Starbucks Refreshers',
    'Bottled Drinks',
    "Kids' Drinks & Others",
    'Smoothies',
    'Fizzio™ Handcrafted Sodas',
    'Bakery',
    'Mercato',
    'Starbucks Petities',
    'Hot Breakfast',
    'Sandwiches, Paninis, & Salads',
    'Yogurt, Fruit, & Spreads'
  ],
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
