import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { langLabels, projects } from '@/content/projects';
import { toRowData } from '@/lib/projects';
import { ProjectExplorer } from './project-explorer';

const labels = {
  group: 'Filter projects by language',
  filters: { all: 'All', ...langLabels },
  practices: 'Practices',
  toolsFor: 'Tools',
  thesisTag: 'thesis · 44/44 tests',
};

function renderExplorer() {
  return render(
    <ProjectExplorer
      heading={<h2>01 — Work</h2>}
      projects={projects.map((p) => toRowData(p, 'en'))}
      labels={labels}
    />,
  );
}

const rowNames = () =>
  within(screen.getByRole('list'))
    .getAllByRole('listitem')
    .map((li) => li.textContent);

describe('ProjectExplorer', () => {
  afterEach(() => window.history.replaceState(null, '', '/'));

  it('shows every project and the practices line by default', () => {
    renderExplorer();
    expect(rowNames()).toHaveLength(4);
    expect(screen.getByRole('button', { name: 'All 4' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText(/^Practices — Clean Architecture/)).toBeInTheDocument();
  });

  it('filters, updates aria-pressed, the toolbelt and the URL', async () => {
    renderExplorer();
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'C# 1' })));

    expect(rowNames()).toHaveLength(1);
    expect(rowNames()[0]).toContain('GenAIrator');
    expect(screen.getByRole('button', { name: 'C# 1' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'All 4' })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText(/^Tools · C# — ASP\.NET Core/)).toBeInTheDocument();
    expect(window.location.search).toBe('?stack=csharp');

    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'All 4' })));
    expect(window.location.search).toBe('');
  });

  it('starts from ?stack= in the URL', () => {
    window.history.replaceState(null, '', '/en?stack=python');
    renderExplorer();
    expect(rowNames()).toHaveLength(3);
    expect(screen.getByRole('button', { name: 'Python 3' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('links the case study and leaves rows without a target unlinked', () => {
    renderExplorer();
    expect(screen.getByRole('link', { name: /GenAIrator/ })).toHaveAttribute(
      'href',
      '/en/projects/genairator',
    );
    expect(screen.queryByRole('link', { name: /SentinelAPI/ })).not.toBeInTheDocument();
  });
});
