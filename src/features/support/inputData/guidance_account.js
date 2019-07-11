/* eslint-disable max-len */
import reportSafety from './guidance_reportSafety';

export default {
  cancelSubscription: {
    'cancel my bukka unlimited membership': [
      {
        heading: '',
        paragraph: true,
        paragraphs: [
          `If you signed up for a free trial and cancel before your free trial ends,
        you will not be charged.`,

          `If you cancel after your free trial ends, you must cancel your membership
        before the next renewal date to avoid payment of the next billing cycle.`,

          `If you cancel an annual or monthly membership that you've used,
        you will not receive any refund but you will be able to use your
        Unlimited membership for the remainder of your pre-paid membership term.`
        ]
      },
    ],
  },
  changeEmail: {
    'how do i change my email': [
      {
        heading: '',
        paragraph: true,
        paragraphs: [
          `Create a new bukka account with the correct email address or one of
          which you are the administrator.  At this time we are unable to make
          any changes to the email address currently registered with your bukka account.`
        ]
      },
    ],
  },
  securityConcern: {
    inputBox: [
      {
        dropdown: true,
        heading: 'please tell us why you want to delete your account so we can improve our experience.',
        default: '-',
        items: [
          'Bad experience on an order',
          'Bad experience with a bukka',
          'negative support experience',
          'issues with my account',
          'other'
        ]
      },
    ],
  },
  deleteAccount: {
    ...reportSafety,
    'Anti-Descrimination Policy': [
      {
        paragraph: true,
        heading: '',
        paragraphs: [
          `At bukka we prohibit any and all discrimination based on race, ethnicity,
          national origin, religion, disability, sexual orientation, sex, marital status, gender,
          gender identity, age, or any other category protected under applicable law.
          Such discrimination may include, but is not limited to, refusing to provide or accept
          services based on these characteristics. Anyone who violates this policy by
          discriminating against members of the bukka community may permanently
          lose access to the platform.`
        ]
      },
    ],
  },
  suspendedAccount: {
    ...reportSafety,
    'why is there a hold placed on my account?': [
      {
        heading: '',
        paragraph: true,
        paragraphs: [
          `A hold can be placed on your account for a number of reasons.
          When a hold is placed on your account you can still browse and
          navigate the bukka apps and website, however
          you will not be able to place a new order until
          you have resolved the issue(s). Issues include: `
        ],
      },
      {
        heading: '',
        list: true,
        items: [
          {
            strong: 'Failed charge',
            light: `- Your payment method was declined when bukka
            attempted to charge for your delivery or tip amount.`
          },
          {
            strong: `Disputed payment - A purchase made using your
            bukka account was disputed as fraudulent with the payment provider.`
          },
          {
            strong: 'Unusual account activity',
            light: '- Our system detected an unusual order made using your bukka account.'
          }
        ],
      },
      {
        heading: '',
        paragraph: true,
        paragraphs: [
          `When a hold is placed, you will receive an email indicating
           the reason for the hold and instructions on how to resolve.
           If you still need help, please contact us.`
        ]
      }
    ],
    'A hold was placed on my account to a disputed payment what do i do?': [
      {
        heading: '',
        paragraph: true,
        paragraphs: [
          `When bukka receives word of a payment dispute (or “chargeback”) from your bank,
          we assume the payment was made without your permission and
          immediately place a hold on your account to prevent any additional unauthorized transactions.`,

          `If a hold was placed on your account because of a dispute but you are the cardholder and did
          indeed place the order yourself, withdraw the dispute with your payment provider
          and provide a screenshot of the confirmation as a reply to your exchange with bukka Support.`,

          'Once we’ve received your documentation, we’ll remove the hold on your account.',

          `Note that if your bukka account is linked to a friend of family member's
          payment information, it is possible that they have disputed the payment.
          Please check with them and
          submit a screenshot of the confirmation as a reply to your exchange with bukka Support.`
        ]
      },
    ],
    'how can i pay a past due balance on my bukka account?': [
      {
        heading: '',
        paragraph: true,
        paragraphs: [
          `If your payment method failed for an order, you will need to resolve the balance before
           you can place a new order on bukka. To change payment methods or resolve
           your balance, navigate to your Delivery History and find the order labeled
           with "Payment Failed". In the bukka app, you can find your Delivery
           History by tapping the clock icon in the upper-right hand corner of the home screen.`,

          `Locate the order and update your payment method and tap Done. The charge should process
          immediately and the hold on your account will be lifted.`,
        ]
      },
    ],
  },
  accountOther: {
    'how can i apply a promo code': [
      {
        heading: '',
        paragraph: true,
        paragraphs: [
          `Bukka will periodically offer promotions or discounts off of delivery fees or
           items on the app which can sometimes be redeemed via a promotional code. `,

          `To use the code you were sent via push notification or email, please input
           the full promotional code into the bukka app under the
           "Add Promo Code” section (iOS) or “Enter Promo Code” (Android) section in the settings. `,

          `You can also add this code to the checkout screen when placing an order in
           the ‘Promo Code’ section. Please be sure to insert this code into the app
           before you place your order as we are unable to apply it on our end.`,

          `If your order is canceled for any reason, your credit will remain on your account
          and automatically apply toward your next delivery, if applicable.`,

          `If you have any questions regarding the promotional code, please reach out to bukka Customer
           Service by selecting ‘Contact Customer Service’ via the Help Center main page.`
        ]
      }
    ],
    'Gift card': [
      {
        heading: '',
        link: true,
        paragraph: true,
        paragraphs: [
          `Bukka gift cards are a simple way to send a friend a code that treats
           them to anything in their city. The gift cards are sent via
           email and you can choose what value to tie to the code - $25, $50, $100, or $200.`,

          'visit &lt;a href=&quot;http://www.bukka.com/gift&quot; target=&quot;_blank&quot;&gt; bukka.com/gift &lt;/a&gt; to get started.',
        ]
      },
      {
        heading: 'How do I redeem my Bukka Gift Card?',
        list: true,
        listType: 'number',
        items: [
          'In your gift card email find the redemption code.',
          'Copy and paste that code and enter it just like you would a promo code or friend referral code.',
          'In the Bukka app you can enter the code on the "Add Promo Code" page or at the checkout page.',
          'On the web you can enter your code at the checkout page right before hitting the Get It Now button.'
        ]
      },
      {
        heading: 'Does my gift card ever expire?',
        list: true,
        items: [
          'Once a gift card has been added to a Bukka account, the funds on it will never expire. '
        ]
      },
      {
        heading: 'What can I buy with my gift card?',
        list: true,
        items: [
          'Gift cards cover the cost of the goods in your basket and delivery fees.'
        ]
      },
      {
        heading: 'Can I use my gift card to add a tip?',
        list: true,
        items: [
          'Bukka Gift Card do not cover tips.'
        ]
      },
      {
        heading: 'How can I see the remaining balance on my Gift Card?',
        link: true,
        list: true,
        items: [
          `Log into your account and visit
           &lt;a href=&quot;/buyer/articles/credits-and-promotions&quot; target=&quot;_blank&quot;&gt; this page &lt;/a&gt;
           to view the balance.`
        ]
      },
      {
        heading: 'How do I purchase and send a Bukka gift card?',
        paragraph: true,
        paragraphs: [
          'You can purchase and send a gift card to anyone with an email address, here\'s how:'
        ]
      },
      {
        heading: 'How can I see the remaining balance on my Gift Card?',
        link: true,
        listType: 'number',
        list: true,
        items: [
          `Go to
           &lt;a href=&quot;/gift&quot; target=&quot;_blank&quot;&gt; bukka.com/gift &lt;/a&gt;
           this page to view the balance.`,

          'Click the button "Send Gift Card"',

          'Pick your card style, amount, and fill out your recipient information.',

          'Enter your credit card info and click "Buy Gift Card" to finalize purchase.',

          `We’ll immediately send the gift card by email, and the recipient can easilyadd
           it to their Bukka account.`
        ]
      },
      {
        heading: '',
        link: true,
        paragraph: true,
        paragraphs: [
          `For information please see our
          &lt;a href=&quot;/legal/gift-cards&quot; target=&quot;_blank&quot;&gt; Gift Card Terms. &lt;/a&gt;`
        ]
      }
    ]
  }
};
