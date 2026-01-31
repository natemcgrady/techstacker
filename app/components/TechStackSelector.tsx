import React from 'react';
import { useAtom } from 'jotai';
import { tools, CategoryType } from '@/app/lib/tools';
import {
  selectedToolsAtom,
  addToolAtom,
  removeToolAtom,
  clearSelectedToolsAtom,
  sidebarCollapsedAtom,
  toggleSidebarAtom,
} from '../store/selectedTools';
import { themeAtom } from '../store/themes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const TechStackSelector: React.FC = () => {
  const [selectedTools] = useAtom(selectedToolsAtom);
  const [, addTool] = useAtom(addToolAtom);
  const [, removeTool] = useAtom(removeToolAtom);
  const [, clearSelectedTools] = useAtom(clearSelectedToolsAtom);
  const [isCollapsed] = useAtom(sidebarCollapsedAtom);
  const [, toggleSidebar] = useAtom(toggleSidebarAtom);
  const [currentTheme] = useAtom(themeAtom);

  const categories: { key: CategoryType; label: string }[] = [
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'database', label: 'Database' },
    { key: 'infra', label: 'Infrastructure' },
    { key: 'devops', label: 'DevOps' },
  ];

  const isSelected = (toolId: number) => {
    return selectedTools.some((tool) => tool.id === toolId);
  };

  const handleToolClick = (tool: any) => {
    if (isSelected(tool.id)) {
      removeTool(tool.id);
    } else {
      addTool(tool);
    }
  };

  // Dynamic theme colors for selected tools
  const themeBorderColor = currentTheme.background.from;
  const themeBackgroundColor = `${currentTheme.background.from}20`; // 20 is ~12% opacity in hex

  return (
    <div
      className={cn(
        'fixed z-10 top-[50px] right-0 h-[calc(100vh-50px)] bg-card border-l border-border transition-all duration-300 ease-in-out overflow-hidden',
        isCollapsed ? 'w-12' : 'w-80'
      )}
    >
      {/* Collapse/Expand Button */}
      <div className='flex items-center justify-between p-3 border-b border-border'>
        {!isCollapsed && (
          <div className='flex items-center gap-2'>
            <h2 className='text-lg font-semibold text-foreground'>Tech Stack</h2>
            {selectedTools.length > 0 && (
              <Button
                variant='ghost'
                size='sm'
                onClick={clearSelectedTools}
                className='text-xs text-muted-foreground hover:text-foreground'
                title='Clear all selected tools'
              >
                Clear
              </Button>
            )}
          </div>
        )}
        <Button
          variant='ghost'
          size='icon'
          onClick={toggleSidebar}
          className='shrink-0'
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            className={cn(
              'transition-transform duration-200',
              isCollapsed && 'rotate-180'
            )}
          >
            <path
              d='M6 4L10 8L6 12'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </Button>
      </div>

      {/* Sidebar Content */}
      <div
        className={cn(
          'h-[calc(100%-73px)] overflow-y-auto transition-all duration-300',
          'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent hover:scrollbar-thumb-muted-foreground/50',
          isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'transparent transparent'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.scrollbarColor = 'rgb(107 114 126) transparent';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.scrollbarColor = 'transparent transparent';
        }}
      >
        <div className='p-4 space-y-6'>
          {categories.map(({ key, label }) => (
            <div key={key}>
              <h3 className='mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                {label}
              </h3>
              <div className='grid grid-cols-3 gap-2'>
                {tools[key].map((tool) => (
                  <button
                    key={tool.id}
                    className={cn(
                      'flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105',
                      'bg-muted border-transparent hover:border-border hover:bg-accent',
                      'focus:outline-none focus:ring-2 focus:ring-ring',
                      !isSelected(tool.id) && 'focus:border-transparent',
                      isSelected(tool.id) && 'shadow-sm'
                    )}
                    style={
                      isSelected(tool.id)
                        ? ({
                            borderColor: themeBorderColor,
                            backgroundColor: themeBackgroundColor,
                            '--tw-ring-color': themeBorderColor,
                          } as React.CSSProperties)
                        : {}
                    }
                    onClick={() => handleToolClick(tool)}
                    title={tool.name}
                  >
                    <div className='flex items-center justify-center w-8 h-8 mb-2'>
                      <Image
                        src={tool.icon}
                        alt={tool.name}
                        width={32}
                        height={32}
                        className='object-contain max-w-full max-h-full'
                      />
                    </div>
                    <span className='text-xs font-medium text-foreground text-center leading-tight'>
                      {tool.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackSelector;
