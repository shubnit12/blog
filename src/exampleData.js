const exampleData = {
  time: 1751375034039,
  blocks: [
    {
      id: "tJHtFfC5Pv",
      type: "header",
      data: {
        text: "This is Bombardillo crocodillo H1",
        level: 1,
      },
    },
    {
      id: "qTSkrkspoK",
      type: "header",
      data: {
        text: "This is Bombardillo crocodillo H2",
        level: 2,
      },
    },
    {
      id: "B21T2j074I",
      type: "header",
      data: {
        text: "This is Bombardillo crocodillo H3",
        level: 3,
      },
    },
    {
      id: "X1Wodxb6-1",
      type: "header",
      data: {
        text: "This is Bombardillo crocodillo H4",
        level: 4,
      },
    },
    {
      id: "bJ5NvVfnrg",
      type: "header",
      data: {
        text: "This is Bombardillo crocodillo H5",
        level: 5,
      },
    },
    {
      id: "I5488I2Wjx",
      type: "header",
      data: {
        text: "This is Bombardillo crocodillo H6",
        level: 6,
      },
    },
    {
      id: "TAm4cPTNBh",
      type: "paragraph",
      data: {
        text: 'Before you can begin to determine what the composition of a particular paragraph will be, you must first decide on an argument and a working thesis statement for your paper. What is the most important idea that you are trying to convey to your reader? The information in each paragraph must be related to that idea. I<b>n other word</b>s, your paragraphs should remind your reader that there is a recurrent relationship between your thesis and the information in each paragraph. A working thesis functions like a seed from which your <i>paper, and your ideas, </i><a href="http://www.google.com">will grow. Th</a>e whole process is an organic one—a natural progression from a seed to a full-blown paper where there are direct, familial relationships between all of the ideas in the paper.The decision about what to put into your paragraphs begins with the germination of a seed of ideas; this “germination process” is better known as brainstorming. There are many techniques for brainstorming; whichever one you choose, this stage of paragraph development cannot be skipped. Building paragraphs can be like building a skyscraper: there must be a well-planned foundation that supports what you are building. Any cracks, inconsistencies, or other corruptions of the foundation can cause your whole paper to crumble.',
      },
    },
    {
      id: "J0lgYgNpy_",
      type: "image",
      data: {
        caption: "",
        withBorder: false,
        withBackground: false,
        stretched: false,
        file: {
          url: "http://localhost:4000/uploads/1751375004302-personal_website.jpg",
        },
      },
    },
    {
      id: "CQIdvIr0X9",
      type: "code",
      data: {
        code: "useEffect(() =&gt; {\n    // Simulating a fetch request to get escaped code from the server\n    fetch(&quot;/api/code&quot;)\n      .then((response) =&gt; response.text()) // Get raw text from server\n      .then((data) =&gt; setEscapedCode(data))\n      .catch((error) =&gt; console.error(&quot;Error fetching code:&quot;, error));\n  }, []);\n\n  return (\n    &lt;div&gt;\n      &lt;h1&gt;Dynamic Code Block&lt;/h1&gt;\n      {escapedCode ? (\n        &lt;CodeBlock escapedCode={escapedCode} /&gt;\n      ) : (\n        &lt;p&gt;Loading code...&lt;/p&gt;\n      )}\n    &lt;/div&gt;\n  );\n};\n\nexport default App;",
        language: "plain",
        showlinenumbers: true,
        showCopyButton: true,
      },
    },
    {
      id: "TehgBHAEl6",
      type: "table",
      data: {
        withHeadings: false,
        stretched: false,
        content: [
          ["Theading", "heafing"],
          ["data", "data"],
          ["aSDBadsbkjD", "bhasdkhjABDSKJad"],
        ],
      },
    },
    {
      id: "EkX9Nc--JI",
      type: "List",
      data: {
        style: "unordered",
        meta: {},
        items: [
          {
            content: "one two",
            meta: {},
            items: [],
          },
          {
            content: "three",
            meta: {},
            items: [],
          },
        ],
      },
    },
    {
      id: "F9axY_o3hY",
      type: "List",
      data: {
        style: "ordered",
        meta: {
          counterType: "numeric",
        },
        items: [
          {
            content: "one",
            meta: {},
            items: [],
          },
          {
            content: "two",
            meta: {},
            items: [],
          },
        ],
      },
    },
    {
      id: "6c9oE8lDxz",
      type: "List",
      data: {
        style: "checklist",
        meta: {},
        items: [
          {
            content: "three",
            meta: {
              checked: true,
            },
            items: [],
          },
          {
            content: "xxxxx",
            meta: {
              checked: false,
            },
            items: [],
          },
        ],
      },
    },
    {
      id: "StYHvJLTSu",
      type: "image",
      data: {
        caption: "",
        withBorder: false,
        withBackground: false,
        stretched: false,
        file: {
          url: "http://localhost:4000/uploads/1751375019641-1389830.jpg",
        },
      },
    },
  ],
  version: "2.31.0-rc.7",
};
export default exampleData;
