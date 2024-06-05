import React, { useState } from 'react';

export function TagsInput({ tags, setTags } : { tags: string[], setTags: (tags: string[]) => void }) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if(tags.length==5 || tags.includes(input.trim())) return
      setTags([...tags, input.trim()]);
      setInput('');
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex flex-wrap mb-2">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center bg-gray-200 rounded-full px-3 py-1 mr-2 my-2">
            <span>{tag}</span>
            <button type="button" className="ml-2" onClick={() => removeTag(index)}>x</button>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="border outline-none p-4 mb-3 w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a topic...(Press enter to add a tag)"
      />
    </div>
  );
};
