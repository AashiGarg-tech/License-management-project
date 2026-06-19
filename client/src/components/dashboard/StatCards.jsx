import { statsData } from "../../data/excelDummyData";

const StatCards = () => {
  const cards = [
    {
      title: "Total Microsoft Licenses",
      value: statsData.totalLicenses,
      bgClass: "from-sky-600 via-sky-500 to-cyan-500",
      
    },
    {
      title: "License Types",
      value: statsData.licenseTypes,
      bgClass: "from-emerald-500 via-teal-500 to-cyan-500",
     
    },
    {
      title: "Total Labs",
      value: statsData.totalLabs,
      bgClass: "from-orange-500 via-orange-400 to-amber-400",
      
    },
    {
      title: "Total Consumers",
      value: statsData.totalConsumers,
      bgClass: "from-violet-500 via-fuchsia-500 to-pink-500",
      
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-5">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`rounded-3xl shadow-2xl p-6 text-white bg-gradient-to-br ${card.bgClass}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold opacity-90">{card.title}</h3>
            <span className="text-2xl">{card.icon}</span>
          </div>

          <p className="text-4xl font-bold tracking-tight">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatCards;