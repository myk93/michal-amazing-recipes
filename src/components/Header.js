import React from 'react';
import { BookOpen, PlusCircle, Cloud, HardDrive } from 'lucide-react';

function Header({ activeTab, onTabChange, isFirebaseEnabled }) {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-icon">🍳</span>
        <h1>ספר המתכונים של מיכל</h1>
      </div>

      <nav className="tabs">
        <button
          className={`tab-btn ${activeTab === 'recipes' ? 'active' : ''}`}
          onClick={() => onTabChange('recipes')}
        >
          <BookOpen size={20} />
          מתכונים
        </button>
        <button
          className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => onTabChange('add')}
        >
          <PlusCircle size={20} />
          הוסף מתכון
        </button>
      </nav>

      <div className="sync-status" title={isFirebaseEnabled ? 'מסונכרן עם כל המשתמשים' : 'שמירה מקומית בלבד'}>
        {isFirebaseEnabled ? (
          <>
            <Cloud size={16} className="sync-icon online" />
            <span>מסונכרן</span>
          </>
        ) : (
          <>
            <HardDrive size={16} className="sync-icon offline" />
            <span>מקומי</span>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
