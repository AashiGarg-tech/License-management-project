export const predictionTrend = {
    Daily: [
      { label: "Mon", ADAMS_View: 82, Patran: 54, Solver: 42, Marc: 28, SimManager: 17, Easy5: 11, Nastran: 7, Adams_Post: 5 },
      { label: "Tue", ADAMS_View: 88, Patran: 58, Solver: 45, Marc: 30, SimManager: 18, Easy5: 12, Nastran: 7, Adams_Post: 5 },
      { label: "Wed", ADAMS_View: 91, Patran: 60, Solver: 46, Marc: 32, SimManager: 19, Easy5: 13, Nastran: 8, Adams_Post: 6 },
      { label: "Thu", ADAMS_View: 95, Patran: 63, Solver: 48, Marc: 34, SimManager: 20, Easy5: 13, Nastran: 8, Adams_Post: 6 },
      { label: "Fri", ADAMS_View: 102, Patran: 66, Solver: 50, Marc: 36, SimManager: 21, Easy5: 14, Nastran: 9, Adams_Post: 7 },
      { label: "Sat", ADAMS_View: 108, Patran: 69, Solver: 52, Marc: 38, SimManager: 22, Easy5: 15, Nastran: 9, Adams_Post: 7 },
      { label: "Sun", ADAMS_View: 115, Patran: 72, Solver: 55, Marc: 40, SimManager: 23, Easy5: 16, Nastran: 10, Adams_Post: 8 },
    ],
  
    Weekly: [
      { label: "Week 1", ADAMS_View: 104, Patran: 67, Solver: 49, Marc: 36, SimManager: 21, Easy5: 15, Nastran: 9, Adams_Post: 7 },
      { label: "Week 2", ADAMS_View: 109, Patran: 70, Solver: 52, Marc: 38, SimManager: 22, Easy5: 16, Nastran: 10, Adams_Post: 8 },
      { label: "Week 3", ADAMS_View: 113, Patran: 73, Solver: 54, Marc: 40, SimManager: 23, Easy5: 17, Nastran: 10, Adams_Post: 8 },
      { label: "Week 4", ADAMS_View: 118, Patran: 76, Solver: 57, Marc: 42, SimManager: 25, Easy5: 18, Nastran: 11, Adams_Post: 9 },
    ],
  
    Monthly: [
      { label: "Jan", ADAMS_View: 84, Patran: 55, Solver: 39, Marc: 27, SimManager: 15, Easy5: 10, Nastran: 6, Adams_Post: 4 },
      { label: "Feb", ADAMS_View: 89, Patran: 58, Solver: 42, Marc: 29, SimManager: 16, Easy5: 11, Nastran: 7, Adams_Post: 5 },
      { label: "Mar", ADAMS_View: 93, Patran: 61, Solver: 44, Marc: 31, SimManager: 17, Easy5: 12, Nastran: 7, Adams_Post: 5 },
      { label: "Apr", ADAMS_View: 98, Patran: 64, Solver: 46, Marc: 33, SimManager: 18, Easy5: 13, Nastran: 8, Adams_Post: 6 },
      { label: "May", ADAMS_View: 103, Patran: 67, Solver: 49, Marc: 35, SimManager: 20, Easy5: 14, Nastran: 8, Adams_Post: 6 },
      { label: "Jun", ADAMS_View: 108, Patran: 70, Solver: 52, Marc: 37, SimManager: 21, Easy5: 15, Nastran: 9, Adams_Post: 7 },
      { label: "Jul", ADAMS_View: 115, Patran: 74, Solver: 55, Marc: 40, SimManager: 23, Easy5: 16, Nastran: 10, Adams_Post: 8 },
    ],
  };
  export const modules = [
    "ADAMS_View",
    "Patran",
    "Solver",
    "Marc",
    "SimManager",
    "Easy5",
    "Nastran",
    "Adams_Post",
  ];
  
  export const moduleStats = {
    ADAMS_View: {
      currentPeak: 115,
      utilization: "91%",
      status: "High Demand",
      color: "text-red-600",
      bg: "bg-red-100",
    },
  
    Patran: {
      currentPeak: 68,
      utilization: "78%",
      status: "Normal",
      color: "text-green-600",
      bg: "bg-green-100",
    },
  
    Solver: {
      currentPeak: 52,
      utilization: "71%",
      status: "Moderate",
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
  
    Marc: {
      currentPeak: 28,
      utilization: "56%",
      status: "Low",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
  
    SimManager: {
      currentPeak: 17,
      utilization: "41%",
      status: "Low",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
  
    Easy5: {
      currentPeak: 11,
      utilization: "32%",
      status: "Low",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
  
    Nastran: {
      currentPeak: 7,
      utilization: "21%",
      status: "Very Low",
      color: "text-slate-600",
      bg: "bg-slate-100",
    },
  
    Adams_Post: {
      currentPeak: 6,
      utilization: "19%",
      status: "Very Low",
      color: "text-slate-600",
      bg: "bg-slate-100",
    },
  };
  export const futurePredictions = {
    ADAMS_View: [
      {
        period: "Tomorrow",
        value: 118,
        change: "+2.6%",
      },
      {
        period: "Next Week",
        value: 126,
        change: "+9.5%",
      },
      {
        period: "Next Month",
        value: 139,
        change: "+20.9%",
      },
    ],
  
    Patran: [
      {
        period: "Tomorrow",
        value: 71,
        change: "+3.1%",
      },
      {
        period: "Next Week",
        value: 76,
        change: "+8.2%",
      },
      {
        period: "Next Month",
        value: 84,
        change: "+18.4%",
      },
    ],
  
    Solver: [
      {
        period: "Tomorrow",
        value: 54,
        change: "+2.8%",
      },
      {
        period: "Next Week",
        value: 59,
        change: "+8.1%",
      },
      {
        period: "Next Month",
        value: 66,
        change: "+17.3%",
      },
    ],
  
    Marc: [
      {
        period: "Tomorrow",
        value: 30,
        change: "+3.4%",
      },
      {
        period: "Next Week",
        value: 34,
        change: "+9.6%",
      },
      {
        period: "Next Month",
        value: 39,
        change: "+19.5%",
      },
    ],
    SimManager: [
        {
          period: "Tomorrow",
          value: 18,
          change: "+5.9%",
        },
        {
          period: "Next Week",
          value: 21,
          change: "+11.4%",
        },
        {
          period: "Next Month",
          value: 25,
          change: "+22.5%",
        },
      ],
      
      Easy5: [
        {
          period: "Tomorrow",
          value: 12,
          change: "+4.5%",
        },
        {
          period: "Next Week",
          value: 14,
          change: "+9.1%",
        },
        {
          period: "Next Month",
          value: 17,
          change: "+18.2%",
        },
      ],
      
      Nastran: [
        {
          period: "Tomorrow",
          value: 8,
          change: "+3.8%",
        },
        {
          period: "Next Week",
          value: 9,
          change: "+8.5%",
        },
        {
          period: "Next Month",
          value: 11,
          change: "+15.6%",
        },
      ],
      
      Adams_Post: [
        {
          period: "Tomorrow",
          value: 6,
          change: "+3.2%",
        },
        {
          period: "Next Week",
          value: 7,
          change: "+7.6%",
        },
        {
          period: "Next Month",
          value: 9,
          change: "+14.8%",
        },
      ],
  };
  export const recommendations = {
    ADAMS_View: {
      confidence: "94%",
      risk: "High",
      color: "red",
      recommendation: "Increase License Pool",
  
      reasons: [
        "Predicted peak usage exceeds available license capacity.",
        "Denied requests are expected to increase next week.",
      ],
  
      actions: [
        "Purchase 20 additional floating licenses.",
        "Review utilization after the next weekly prediction.",
      ],
    },
  
    Patran: {
      confidence: "91%",
      risk: "Medium",
      color: "amber",
      recommendation: "Monitor Usage",
  
      reasons: [
        "Demand is increasing steadily.",
        "Utilization may exceed 80% next month.",
      ],
  
      actions: [
        "Monitor weekly utilization trends.",
        "Review license allocation before the next release.",
      ],
    },
  
    Solver: {
      confidence: "89%",
      risk: "Low",
      color: "green",
      recommendation: "No Immediate Action",
  
      reasons: [
        "Utilization remains within safe operating limits.",
        "No license shortage is predicted.",
      ],
  
      actions: [
        "Continue routine monitoring.",
        "Retrain the prediction model during the monthly update.",
      ],
    },
  
    Marc: {
      confidence: "88%",
      risk: "Low",
      color: "green",
      recommendation: "Maintain Current Capacity",
  
      reasons: [
        "Historical usage remains stable.",
        "No significant demand spike is predicted.",
      ],
  
      actions: [
        "Maintain the current license pool.",
        "Review utilization quarterly.",
      ],
    },
  
    SimManager: {
      confidence: "87%",
      risk: "Low",
      color: "green",
      recommendation: "Maintain Current Capacity",
  
      reasons: [
        "Predicted demand remains within available capacity.",
        "No increase in denied requests is expected.",
      ],
  
      actions: [
        "Continue monthly utilization monitoring.",
        "Review license allocation quarterly.",
      ],
    },
  
    Easy5: {
      confidence: "86%",
      risk: "Low",
      color: "green",
      recommendation: "No Immediate Action",
  
      reasons: [
        "Current utilization is well below capacity.",
        "Forecast indicates only gradual growth.",
      ],
  
      actions: [
        "Continue routine monitoring.",
        "Re-evaluate during the monthly review.",
      ],
    },
  
    Nastran: {
      confidence: "84%",
      risk: "Very Low",
      color: "green",
      recommendation: "Maintain Current Capacity",
  
      reasons: [
        "Very low utilization is predicted.",
        "Existing licenses are sufficient.",
      ],
  
      actions: [
        "Maintain the current license pool.",
        "Review utilization quarterly.",
      ],
    },
  
    Adams_Post: {
      confidence: "83%",
      risk: "Very Low",
      color: "green",
      recommendation: "No Action Required",
  
      reasons: [
        "Predicted utilization remains consistently low.",
        "No capacity constraints are expected.",
      ],
  
      actions: [
        "Continue routine monitoring.",
        "Review predictions during the next monthly cycle.",
      ],
    },
  };
  export const predictionSummary = {
    ADAMS_View: [
      {
        metric: "Peak Concurrent",
        current: 115,
        predicted: 132,
        change: "+14.8%",
        positive: true,
      },
      {
        metric: "OUT Requests",
        current: 4562,
        predicted: 4898,
        change: "+7.4%",
        positive: true,
      },
      {
        metric: "Denied Requests",
        current: 112,
        predicted: 168,
        change: "+50.0%",
        positive: false,
      },
      {
        metric: "License Utilization",
        current: "91%",
        predicted: "98%",
        change: "+7.7%",
        positive: true,
      },
      {
        metric: "Active Users",
        current: 612,
        predicted: 653,
        change: "+6.7%",
        positive: true,
      },
    ],
  
    Patran: [
      {
        metric: "Peak Concurrent",
        current: 68,
        predicted: 76,
        change: "+11.8%",
        positive: true,
      },
      {
        metric: "OUT Requests",
        current: 2185,
        predicted: 2306,
        change: "+5.5%",
        positive: true,
      },
      {
        metric: "Denied Requests",
        current: 48,
        predicted: 61,
        change: "+27.1%",
        positive: false,
      },
      {
        metric: "License Utilization",
        current: "78%",
        predicted: "83%",
        change: "+6.4%",
        positive: true,
      },
      {
        metric: "Active Users",
        current: 321,
        predicted: 339,
        change: "+5.6%",
        positive: true,
      },
    ],
  
    Solver: [
      {
        metric: "Peak Concurrent",
        current: 52,
        predicted: 59,
        change: "+13.5%",
        positive: true,
      },
      {
        metric: "OUT Requests",
        current: 1742,
        predicted: 1826,
        change: "+4.8%",
        positive: true,
      },
      {
        metric: "Denied Requests",
        current: 36,
        predicted: 42,
        change: "+16.7%",
        positive: false,
      },
      {
        metric: "License Utilization",
        current: "71%",
        predicted: "76%",
        change: "+7.0%",
        positive: true,
      },
      {
        metric: "Active Users",
        current: 289,
        predicted: 301,
        change: "+4.2%",
        positive: true,
      },
    ],
  
    Marc: [
      {
        metric: "Peak Concurrent",
        current: 28,
        predicted: 32,
        change: "+14.3%",
        positive: true,
      },
      {
        metric: "OUT Requests",
        current: 1213,
        predicted: 1260,
        change: "+3.9%",
        positive: true,
      },
      {
        metric: "Denied Requests",
        current: 28,
        predicted: 30,
        change: "+7.1%",
        positive: false,
      },
      {
        metric: "License Utilization",
        current: "56%",
        predicted: "61%",
        change: "+8.9%",
        positive: true,
      },
      {
        metric: "Active Users",
        current: 198,
        predicted: 205,
        change: "+3.5%",
        positive: true,
      },
    ],
    SimManager: [
        {
          metric: "Peak Concurrent",
          current: 17,
          predicted: 21,
          change: "+23.5%",
          positive: true,
        },
        {
          metric: "OUT Requests",
          current: 512,
          predicted: 548,
          change: "+7.0%",
          positive: true,
        },
        {
          metric: "Denied Requests",
          current: 9,
          predicted: 11,
          change: "+22.2%",
          positive: false,
        },
        {
          metric: "License Utilization",
          current: "41%",
          predicted: "48%",
          change: "+17.1%",
          positive: true,
        },
        {
          metric: "Active Users",
          current: 112,
          predicted: 119,
          change: "+6.3%",
          positive: true,
        },
      ],
      
      Easy5: [
        {
          metric: "Peak Concurrent",
          current: 11,
          predicted: 14,
          change: "+27.3%",
          positive: true,
        },
        {
          metric: "OUT Requests",
          current: 326,
          predicted: 348,
          change: "+6.7%",
          positive: true,
        },
        {
          metric: "Denied Requests",
          current: 6,
          predicted: 7,
          change: "+16.7%",
          positive: false,
        },
        {
          metric: "License Utilization",
          current: "32%",
          predicted: "38%",
          change: "+18.8%",
          positive: true,
        },
        {
          metric: "Active Users",
          current: 78,
          predicted: 84,
          change: "+7.7%",
          positive: true,
        },
      ],
      
      Nastran: [
        {
          metric: "Peak Concurrent",
          current: 7,
          predicted: 9,
          change: "+28.6%",
          positive: true,
        },
        {
          metric: "OUT Requests",
          current: 184,
          predicted: 197,
          change: "+7.1%",
          positive: true,
        },
        {
          metric: "Denied Requests",
          current: 2,
          predicted: 3,
          change: "+50.0%",
          positive: false,
        },
        {
          metric: "License Utilization",
          current: "21%",
          predicted: "27%",
          change: "+28.6%",
          positive: true,
        },
        {
          metric: "Active Users",
          current: 42,
          predicted: 46,
          change: "+9.5%",
          positive: true,
        },
      ],
      
      Adams_Post: [
        {
          metric: "Peak Concurrent",
          current: 6,
          predicted: 8,
          change: "+33.3%",
          positive: true,
        },
        {
          metric: "OUT Requests",
          current: 142,
          predicted: 153,
          change: "+7.7%",
          positive: true,
        },
        {
          metric: "Denied Requests",
          current: 1,
          predicted: 2,
          change: "+100.0%",
          positive: false,
        },
        {
          metric: "License Utilization",
          current: "19%",
          predicted: "24%",
          change: "+26.3%",
          positive: true,
        },
        {
          metric: "Active Users",
          current: 36,
          predicted: 40,
          change: "+11.1%",
          positive: true,
        },
      ],
  };