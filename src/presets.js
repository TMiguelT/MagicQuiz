module.exports = [
    
    //Per-format questions
    {
        description: 'Cards banned in legacy',
        query: 'banned:legacy -o:ante -t:conspiracy -o:/flip ~/'
    },
    {
        description: 'Cards banned in modern',
        query: 'banned:modern'
    },
    {
        description: 'Cards banned in standard',
        query: 'banned:standard'
    },

    // Per-colour questions
    {
        description: 'Black discard spells',
        query: '@@ o:/reveal.*choose.*discard/ c:b t:sorcery not:funny'
    },

    {
        description: 'Red burn spells',
        query: '@@ t:instant c:r o:damage o:"any target" not:funny'
    },

    {
        description: 'Green ramp spells',
        query: '@@ c:g o:/search your library for.*land.*onto the battlefield/ not:permanent -o:/sacrifice.*land/ not:funny'
    },

    {
        description: 'Blue counterspells',
        query: '@@ c:u o:"counter target" t:instant not:funny'
    },

    {
        description: 'White exile spells',
        query: '@@ c:w o:/exile target (creature|permanent)/ (t:instant or t:sorcery) -o:/return.*to the battlefield/ not:funny'
    },

    // Block questions (reverse chronological order)
    {
        description: 'Instant-speed cards from M19 limited',
        query: 's:m19 (t:instant or o:flash) is:booster'
    },

    {
        description: 'Legendary creatures from Dominaria',
        query: '@@ s:dom t:legendary t:creature'
    },

    {
        description: 'Dinosaurs from Ixalan block',
        query: 'b:xln t:dinosaur'
    },

    {
        description: 'Gods from Amonkhet block',
        query: 'b:akh t:god'
    },

    {
        description: 'Kaladesh-block energy cards',
        query: '@@ o:{E}'
    },

    {
        description: 'Transform cards from Shadows over Innistrad',
        query: '@@ b:soi is:transform'
    },

    {
        description: 'Cards with Devoid',
        query: '@@ o:devoid b:bfz'
    },

    {
        description: 'Mythics from Magic Origins',
        query: '@@ r:mythic s:ori'
    },

    {
        description: 'Multicolored cards from Khans',
        query: '@@ c:m b:ktk'
    },

    {
        description: 'Theros commons',
        query: '@@ r:common s:THS'
    },

    {
        description: 'Maze Runners from Dragon\'s Maze',
        query: '@@ s:dgm t:legendary t:creature'
    },

    {
        description: 'Landfall cards',
        query: '@@ o:landfall'
    },

    {
        description: 'Rares from Ravnica',
        query: 'r:rare s:rav is:booster'
    },

    // Misc questions
    {
        description: 'All prints of the Shocklands',
        query: '@@is:shockland'
    },

    {
        description: 'Modern legal cards worth more than $50 USD',
        query: 'usd>50 is:modern f:modern -is:promo'
    },

    {
        description: '3+ coloured legendary creatures',
        query: 'c>2 t:creature t:legendary not:funny'
    },

    {
        description: 'Merfolk from all parts of Magic',
        query: '@@ t:creature t:merfolk not:funny'
    },

    {
        description: 'Buy-a-Box promos',
        query: '@@ is:buyabox'
    },

    {
        description: 'Textless player rewards promos',
        query: '@@ st:player_rewards'
    },

    {
        description: 'All rare lands in Magic',
        query: '@@r:rare t:land not:funny'
    },

    {
        description: 'All planeswalkers in Magic',
        query: '@@ t:planeswalker not:funny'
    }
];