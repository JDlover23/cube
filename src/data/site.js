module.exports = {
  title: "Rubic's cube",
  menuItems: [
    {
      title: "Главная",
      icon: "mdi-home",
      link: "index.html",
    },
    {
      title: "Простая сборка",
      icon: "mdi-cube-outline",
      link: "beginner.html",
    },
    {
      title: "Метод Фридрих",
      icon: "mdi-cube-scan",
      link: "friedrich.html",
    },
    {
      title: "Конструктор положений",
      icon: "mdi-cube-unfolded",
      link: "constructor.html",
    },
  ],
  blocks: [
    {
      code: ["x__c", "y__c", "z"],
      variants: [
        {
          title: "R",
          arrow: "mdi-arrow-up-thin",
        },
        {
          title: "R'",
          arrow: "mdi-arrow-down-thin",
        },
        {
          title: "R2",
          arrow: "mdi-arrow-up-thin",
        },
      ],
    },
    {
      code: ["x__a", "y__a"],
      variants: [
        {
          title: "L",
          arrow: "mdi-arrow-down-thin",
        },
        {
          title: "L'",
          arrow: "mdi-arrow-up-thin",
        },
        {
          title: "L2",
          arrow: "mdi-arrow-down-thin",
        },
      ],
    },
    {
      code: ["x", "y__1", "z__1"],
      variants: [
        {
          title: "U",
          arrow: "mdi-arrow-left-thin",
        },
        {
          title: "U'",
          arrow: "mdi-arrow-right-thin",
        },
        {
          title: "U2",
          arrow: "mdi-arrow-left-thin",
        },
      ],
    },
    {
      code: ["y__3", "z__3"],
      variants: [
        {
          title: "D",
          arrow: "mdi-arrow-right-thin",
        },
        {
          title: "D'",
          arrow: "mdi-arrow-left-thin",
        },
        {
          title: "D2",
          arrow: "mdi-arrow-right-thin",
        },
      ],
    },
    {
      code: ["x__3", "y", "z__a"],
      variants: [
        {
          title: "F",
          arrow: "mdi-arrow-down-thin",
        },
        {
          title: "F'",
          arrow: "mdi-arrow-up-thin",
        },
        {
          title: "F2",
          arrow: "mdi-arrow-down-thin",
        },
      ],
    },
    {
      code: ["x__1", "z__c"],
      variants: [
        {
          title: "B",
          arrow: "mdi-arrow-up-thin",
        },
        {
          title: "B'",
          arrow: "mdi-arrow-down-thin",
        },
        {
          title: "B2",
          arrow: "mdi-arrow-up-thin",
        },
      ],
    },
  ],
};
