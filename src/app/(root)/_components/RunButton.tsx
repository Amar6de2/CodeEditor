"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { useCodeEditorStore } from '@/store/useCodeStoreEditor';
import { motion } from "framer-motion";
import { Loader2, Play } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from 'convex/react';
import { getExecutionResult } from '@/store/useCodeStoreEditor';


const RunButton = () => {
   const {user} =useUser();
   const {isRunning,language,runCode,executionResult}=useCodeEditorStore();
   const saveExecution = useMutation(api.codeExecutions.saveExecution);
   const handleRun=async()=>{
          await runCode();
    const result = getExecutionResult();
          if(user && executionResult)
          {
            // save result to convex
             await saveExecution({
        language,
        code: result?.code || "",
        output: result?.output || undefined,
        error: result?.error || undefined,
      });
   } }
  return (
      <motion.button
      onClick={handleRun}
      disabled={isRunning}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        group relative inline-flex items-center gap-2.5 px-5 py-2.5
        disabled:cursor-not-allowed
        focus:outline-none
      `}
    >
      {/* bg wit gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-100 transition-opacity group-hover:opacity-90" />

      <div className="relative flex items-center gap-2.5">
        {isRunning ? (
          <>
            <div className="relative">
              <Loader2 className="w-4 h-4 animate-spin text-white/70" />
              <div className="absolute inset-0 blur animate-pulse" />
            </div>
            <span className="text-sm font-medium text-white/90">Executing...</span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center w-4 h-4">
              <Play className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-white/90 group-hover:text-white">
              Run Code
            </span>
          </>
        )}
      </div>
    </motion.button>
  )
}

export default RunButton
