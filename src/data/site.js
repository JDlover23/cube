module.exports = {
  title: "Rubic's cube",
  menuItems: [
    {
      title: "Главная",
      icon: "mdi-home",
      link: "index.html",
      hovered: false,
    },
    {
      title: "Простая сборка",
      icon: "mdi-cube-outline",
      link: "beginner.html",
      hovered: false,
    },
    {
      title: "Метод Фридрих",
      icon: "mdi-cube-scan",
      link: "friedrich.html",
      hovered: false,
    },
    {
      title: "Конструктор положений",
      icon: "mdi-cube-unfolded",
      link: "constructor.html",
      hovered: false,
    },
  ],
  blocks: [
    {
      code: ["x__c", "y__c", "z"],
      variants: [
        {
          title: "R",
          arrow: "mdi-arrow-up",
        },
        {
          title: "R'",
          arrow: "mdi-arrow-down",
        },
        {
          title: "R2",
          arrow: "mdi-arrow-up",
        },
      ],
    },
    {
      code: ["x__a", "y__a"],
      variants: [
        {
          title: "L",
          arrow: "mdi-arrow-down",
        },
        {
          title: "L'",
          arrow: "mdi-arrow-up",
        },
        {
          title: "L2",
          arrow: "mdi-arrow-down",
        },
      ],
    },
    {
      code: ["x", "y__1", "z__1"],
      variants: [
        {
          title: "U",
          arrow: "mdi-arrow-left",
        },
        {
          title: "U'",
          arrow: "mdi-arrow-right",
        },
        {
          title: "U2",
          arrow: "mdi-arrow-left",
        },
      ],
    },
    {
      code: ["y__3", "z__3"],
      variants: [
        {
          title: "D",
          arrow: "mdi-arrow-right",
        },
        {
          title: "D'",
          arrow: "mdi-arrow-left",
        },
        {
          title: "D2",
          arrow: "mdi-arrow-right",
        },
      ],
    },
    {
      code: ["x__3", "y", "z__a"],
      variants: [
        {
          title: "F",
          arrow: "mdi-arrow-down",
        },
        {
          title: "F'",
          arrow: "mdi-arrow-up",
        },
        {
          title: "F2",
          arrow: "mdi-arrow-down",
        },
      ],
    },
    {
      code: ["x__1", "z__c"],
      variants: [
        {
          title: "B",
          arrow: "mdi-arrow-up",
        },
        {
          title: "B'",
          arrow: "mdi-arrow-down",
        },
        {
          title: "B2",
          arrow: "mdi-arrow-up",
        },
      ],
    },
  ],
};
