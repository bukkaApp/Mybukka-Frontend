const data = [
  {
    quantity: 1,
    _id: '5e9f61ef8edb14282d76e41f',
    meal: [
      {
        description: 'test meal',
        options: [
          'coke',
          'extra beef'
        ],
        isDeleted: false,
        tags: [
          'african',
          'dish',
          'new-chef'
        ],
        _id: '5e9f61ef8edb14282d76e41f',
        title: 'test-meal_62_5',
        price: 2000,
        submenus: [
          {
            isRequired: false,
            type: 'single',
            _id: '5e9f61ef8edb14282d76e420',
            options: [
              {
                selected: false,
                price: 400,
                visibility: true,
                _id: '5e9f61ef8edb14282d76e422',
                name: 'pepsi'
              }
            ],
            title: 'Add On 1'
          }
        ],
        category: 'italian',
        location: '5e9f61ef8edb14282d76e429',
        imageUrl: 'https://res.cloudinary.com/dn93xk5ni/image/upload/v1552280479/egg-food-fried-rice-53121_ztiwnx.jpg',
        slug: 'test-meal_62_5',
        chef: 'test-meal_chef',
        bukka: 'bukka-slug-infatuation_approved-6',
        createdAt: '2020-04-21T21:13:25.883Z',
        updatedAt: '2020-04-21T21:13:25.883Z'
      }
    ],
    submenus: [
        {
          isRequired: false,
          type: 'single',
          _id: '5e9f61ef8edb14282d76e420',
          options: [
            {
              selected: false,
              price: 400,
              visibility: true,
              _id: '5e9f61ef8edb14282d76e422',
              name: 'pepsi'
            }
          ],
          title: 'Add On 1'
        }
      ],
  }
];


const sortOrders = (orders = data) => {
    // option group - sub menus
    const sortByOptionGroups = [...new Set(products.submenus.map(({ _id }) => _id))]
}