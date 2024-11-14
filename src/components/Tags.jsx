import React from 'react';

const Tags = ({ tags, selectedTag, onTagSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag) => (
        <button
          key={tag.name}
          onClick={() => onTagSelect(tag.name)}
          className={`px-4 py-2 rounded-full ${
            selectedTag === tag.name
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {tag.name} <span className="text-sm text-gray-500">({tag.count})</span>
        </button>
      ))}
    </div>
  );
};

export default Tags;
