import reportSafetyRules from './guidance_reportSafety';
import accountRules from './guidance_account';

export default {
  account: [
    {
      category: 'account',
      link: '/buyer/contact-us/cancel-bukka-unlimited',
      text: 'cancel bukka unlimited subscription',
      helpYourself: { ...accountRules.cancelSubscription }
    },
    {
      category: 'account',
      link: '/buyer/contact-us/change-email',
      text: 'change email address',
      helpYourself: { ...accountRules.changeEmail }
    },
    {
      category: 'account',
      link: '/buyer/contact-us/delete-account',
      text: 'delete account',
      helpYourself: { ...accountRules.deleteAccount }
    },
    {
      category: 'account',
      link: '/buyer/contact-us/security-and-privacy',
      text: 'security/privacy concern',
      helpYourself: { ...accountRules.securityConcern }
    },
    {
      category: 'account',
      link: '/buyer/contact-us/suspended-account',
      text: 'suspended account',
      helpYourself: { ...accountRules.suspendedAccount }
    },
    {
      category: 'account',
      link: '/buyer/contact-us/account-order',
      text: 'other',
      helpYourself: { ...accountRules.accountOther }
    }
  ],
  order: [],
  charges: [
    {
      category: 'charges',
      link: '/buyer/contact-us/multiple-charges',
      text: 'multiple charges'
    },
    {
      category: 'charges',
      link: '/buyer/contact-us/overcharged',
      text: 'overcharges'
    },
    {
      category: 'charges',
      link: '/buyer/contact-us/canceled-charges',
      text: 'i canceled my order but am still showing charges'
    },
    {
      category: 'charges',
      link: '/buyer/contact-us/unauthorized-charge',
      text: 'i have an unauthorized charge of $9.99/$83.88'
    },
    {
      category: 'charges',
      link: '/buyer/contact-us/charged-without-account',
      text: "i'm being charged and i don't have an account with bukka"
    },
    {
      category: 'charges',
      link: '/buyer/contact-us/charges-other',
      text: 'other'
    }
  ],
  'bukka services': [
    {
      category: 'bukka services',
      link: '/buyer/contact-us/my-city',
      text: 'i want bukka in my city!'
    },
    {
      category: 'bukka services',
      link: '/buyer/contact-us/app-review',
      text: 'app review follow-up'
    }
  ],
  'Report a safety issue': [
    {
      helpYourself: { ...reportSafetyRules },
      category: 'Report a safety issue',
      link: '/buyer/contact-us/harassment',
      text: 'harassment'
    },
    {
      helpYourself: { ...reportSafetyRules },
      category: 'Report a safety issue',
      link: '/buyer/contact-us/unwanted-contact',
      text: 'unwanted contact'
    },
    {
      helpYourself: { ...reportSafetyRules },
      category: 'Report a safety issue',
      link: '/buyer/contact-us/theft-or-damage',
      text: 'theft or property damage'
    },
    {
      helpYourself: { ...reportSafetyRules },
      category: 'Report a safety issue',
      link: '/buyer/contact-us/not-bukka-pictured',
      text: "My bukka didn't match their picture"
    },
    {
      helpYourself: { ...reportSafetyRules },
      category: 'Report a safety issue',
      link: '/buyer/contact-us/not-bukka-pictured/other-safety-issue',
      text: 'other'
    }
  ]
};
