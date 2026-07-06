import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { FaTrophy } from "react-icons/fa";
/* ================= SMALL COMPONENTS ================= */

const Tag = ({ label }) => (
  <span className="px-3 py-1 bg-purple-500 text-white text-sm rounded-full mr-2 mb-2 inline-block">
    {label}
  </span>
);

const SectionCard = ({ title, items }) => (
  <div className="bg-white shadow-md rounded-xl p-5">
    <h3 className="text-lg font-semibold mb-3 text-gray-700">{title}</h3>
    <div className="flex flex-wrap">
      {items?.length ? (
        items.map((item, i) => <Tag key={i} label={item} />)
      ) : (
        <p className="text-gray-400">No data</p>
      )}
    </div>
  </div>
);

const ProgressBar = ({ value }) => {
  const safe = Math.max(0, Math.min(100, value || 0));
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
      <div
        className="bg-purple-700 h-2 rounded-full"
        style={{ width: `${safe}%` }}
      ></div>
    </div>
  );
};

/* ================= MAIN ================= */

const Analysis = () => {
  const { state } = useLocation();

  if (!state) return <Navigate to="/home" />;
  // IMPORTANT: Correct data source
 const data = state || {};
  /* ================= ROLES ================= */

  let roles = Array.isArray(data.roles) ? data.roles : [];

  // sort by score
  roles = roles.sort((a, b) => (b.score || 0) - (a.score || 0));

  const bestRole = roles[0] || {};

  /* ================= FIX CONFIDENCE BUG ================= */

  const normalizePercent = (val) => {
    if (!val) return 0;
    if (val > 1) return Math.round(val); // already %
    return Math.round(val * 100); // decimal → %
  };

  const roleName = bestRole.title || "No role detected";
const score = Math.round(bestRole.finalScore || 0);
const confidence = Math.round(bestRole.confidence || 0);
  /* ================= SAFE ARRAYS ================= */

  const safe = (arr) => (Array.isArray(arr) ? arr : []);

  return (
    <div className="bg-[#f6f3ef] min-h-screen p-6 space-y-6">

      {/* ================= TOP CARD ================= */}
      <div className="bg-purple-50 border border-purple-300 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full w-fit font-medium mb-2">
               <FaTrophy className="text-purple-600" />
  BEST ROLE MATCH
                </div>
        <h1 className="text-2xl font-bold mb-6">{roleName}</h1>

        <div className="grid md:grid-cols-3 gap-6">

          <div>
            <p className="text-gray-500">Score</p>
            <p className="text-2xl font-bold">{score}%</p>
            <ProgressBar value={score} />
          </div>

          <div>
            <p className="text-gray-500">Confidence</p>
            <p className="text-2xl font-bold">{confidence}%</p>
            <ProgressBar value={confidence} />
          </div>

          <div>
            <p className="text-gray-500">Repo</p>
            <p className="text-lg font-semibold">
              {state.repo?.name || "Unknown"}
            </p>
          </div>

        </div>
      </div>

      {/* ================= SKILLS ================= */}
      <div className="grid md:grid-cols-2 gap-6">
        <SectionCard title="Languages" items={safe(data.languages)} />
        <SectionCard title="Runtime" items={safe(data.runtime)} />
        <SectionCard title="Frameworks" items={safe(data.frameworks)} />
        <SectionCard title="Databases" items={safe(data.databases)} />
        <SectionCard title="Build Files" items={safe(data.buildFiles)} />
        <SectionCard title="Project Structure" items={safe(data.structure)} />
      </div>

      {/* ================= FILES ================= */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">
          Key Files
        </h3>

        <div className="flex flex-wrap">
          {safe(data.selectedFiles).length ? (
            safe(data.selectedFiles).map((file, i) => (
              <Tag key={i} label={file} />
            ))
          ) : (
            <p className="text-gray-400">No files detected</p>
          )}
        </div>
      </div>

      {/* ================= ALL ROLES ================= */}
      {/* ================= ALL ROLES ================= */}
<div className="space-y-4">
  <div className="flex justify-between items-center">
    <h3 className="text-lg font-semibold text-gray-700">
      Role Matches
    </h3>
    <span className="text-sm text-gray-500">
      {roles.length} roles ranked
    </span>
  </div>

  {roles.length ? (
  roles.map((r, i) => {
    const rScore = Math.round(r.finalScore || 0);
    const rConfidence = Math.round(r.confidence || 0);

    return (
      <div
        key={i}
        className="mb-4 p-4 border rounded-xl bg-gray-50"
      >
        <div className="flex justify-between items-center">
          <p className="font-semibold">
            #{i + 1} {r.title || "Unknown Role"}
          </p>

          <span className="text-sm text-gray-500">
            {rConfidence}% confidence
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Score: {rScore}%
        </p>

        <ProgressBar value={rScore} />

        {/*BEST MATCH TAG */}
        {i === 0 && (
                                                                <span className="flex items-center gap-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full mt-2 w-fit">
                                                <FaTrophy className="text-green-600" />
                       Best Match
                          </span>
        )}
      </div>
    );
  })
) : (
  <p className="text-gray-400">No roles detected</p>
)}
</div>

    </div>
  );
};

export default Analysis;