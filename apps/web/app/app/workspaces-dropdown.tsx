'use client';

import * as React from 'react';
import { WORKSPACES_LIMIT } from '@purly/shared';
import { ChevronDown, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '../../components/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/dialog';
import { useWorkspace } from '../../lib/workspace';
import { CreateWorkspaceForm } from './create-workspace-form';

function WorkspaceIcon({ name }: { name: string }) {
  return (
    <div className="bg-black flex justify-center items-center p-1 w-5 h-5 rounded-[4px] mr-3">
      <span className="text-white select-none text-xs font-bold uppercase">
        {name[0]}
      </span>
    </div>
  );
}

export function WorkspacesDropdown() {
  const { workspaces, currentWorkspace } = useWorkspace();
  const router = useRouter();

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full justify-between" variant="ghost">
            <div className="flex items-center">
              <WorkspaceIcon name={currentWorkspace.name} />
              <span className="font-medium text-base">
                {currentWorkspace.name}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {workspaces.map((workspace: any) => (
            <DropdownMenuCheckboxItem
              key={workspace.id}
              checked={workspace.id === currentWorkspace.id}
              onClick={() => router.push(`/app/${workspace.slug}`)}
            >
              {workspace.name}
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem disabled={workspaces.length >= WORKSPACES_LIMIT}>
              <Plus className="w-4 h-4 mr-2" />
              Create workspace
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new workspace</DialogTitle>
          <DialogDescription>
            Workspaces are containers for your links, statistics.
          </DialogDescription>
        </DialogHeader>
        <CreateWorkspaceForm />
      </DialogContent>
    </Dialog>
  );
}
