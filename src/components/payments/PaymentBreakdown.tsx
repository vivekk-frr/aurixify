'use client';

import React, { useState } from 'react';
import { ProjectWithMembers, Payment } from '@/types';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  CreditCard, ShieldCheck, CheckCircle2, Lock,
  ArrowRight, Download, Receipt, Sparkles, Building2
} from 'lucide-react';

export function PaymentBreakdown({ project }: { project: ProjectWithMembers }) {
  const { processPayment, currentUser } = useApp();
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const payment = project.payments[0] || {
    id: 'pay-demo',
    projectId: project.id,
    amount: project.budget,
    platformFee: Math.round(project.budget * 0.1),
    editorEarnings: Math.round(project.budget * 0.9),
    status: 'unpaid',
    createdAt: project.createdAt,
  };

  const isClient = currentUser?.id === project.clientId;
  const isPaid = payment.status === 'paid';

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      processPayment(project.id);
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsPayModalOpen(false);
        setIsSuccess(false);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Main Billing Card */}
      <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-surface-border">
          <div>
            <span className="text-xs text-gray-400 font-mono">Invoice Reference #{payment.id}</span>
            <h3 className="text-lg font-bold text-white mt-0.5">{project.name}</h3>
          </div>
          <StatusBadge status={payment.status} />
        </div>

        {/* Breakdown Table */}
        <div className="space-y-3 text-xs">
          <div className="flex justify-between py-2 border-b border-surface-border/50 text-gray-300">
            <span>Video Editing Service ({project.numVideos} video{project.numVideos > 1 ? 's' : ''})</span>
            <span className="font-mono text-white font-semibold">{formatCurrency(payment.amount)}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-surface-border/50 text-gray-400">
            <span className="flex items-center gap-1.5">
              <span>Platform Service Fee (10%)</span>
              <span className="text-[10px] bg-surface-50 px-1.5 py-0.5 rounded text-gray-400">Secure Escrow</span>
            </span>
            <span className="font-mono text-gray-300">-{formatCurrency(payment.platformFee)}</span>
          </div>

          <div className="flex justify-between py-3 border-t border-surface-border text-sm font-semibold text-white">
            <span>Editor Net Earnings</span>
            <span className="font-mono text-emerald-400 text-base">{formatCurrency(payment.editorEarnings)}</span>
          </div>

          <div className="flex justify-between py-4 bg-surface-50/80 px-4 rounded-xl border border-surface-border font-bold text-base text-white">
            <span>Total Project Value</span>
            <span className="font-mono text-amber-400 text-lg">{formatCurrency(payment.amount)}</span>
          </div>
        </div>

        {/* Payment Actions */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-bit Encrypted Escrow Protection</span>
          </div>

          {isPaid ? (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4" />
                Payment Completed & Released
              </span>
              <Button size="sm" variant="outline" className="text-xs">
                <Receipt className="w-3.5 h-3.5 mr-1" />
                Download Receipt
              </Button>
            </div>
          ) : (
            isClient && (
              <Button
                size="md"
                variant="primary"
                onClick={() => setIsPayModalOpen(true)}
                className="font-bold shadow-lg shadow-amber-500/25"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                <span>Pay {formatCurrency(payment.amount)} (Release to Editor)</span>
              </Button>
            )
          )}
        </div>
      </div>

      {/* Escrow Trust Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-surface-100/50 border border-surface-border rounded-xl p-4 space-y-2">
          <h4 className="font-semibold text-white flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            How Escrow Works on Aurixify
          </h4>
          <p className="text-gray-400 leading-relaxed text-[11px]">
            Funds are held securely by Aurixify while the editor completes your cut. Money is only released once you review the timestamped drafts and approve the final video.
          </p>
        </div>

        <div className="bg-surface-100/50 border border-surface-border rounded-xl p-4 space-y-2">
          <h4 className="font-semibold text-white flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            Stripe & Direct Payouts Architecture
          </h4>
          <p className="text-gray-400 leading-relaxed text-[11px]">
            Editors receive automated direct bank deposits or Stripe Connect transfers immediately upon client sign-off.
          </p>
        </div>
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        title="Complete Project Payment"
        description="Release funds to your editor to finalize and approve the project."
      >
        <div className="space-y-5 pt-2">
          {isSuccess ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 animate-bounce">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white text-base">Payment Successful!</h4>
              <p className="text-xs text-gray-400">
                {formatCurrency(payment.amount)} released to {project.editor.name}. Project marked as Completed.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-surface-50 p-4 rounded-xl border border-surface-border space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Editor</span>
                  <span className="font-semibold text-white">{project.editor.name}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Project</span>
                  <span className="font-semibold text-white">{project.name}</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-2 border-t border-surface-border font-bold">
                  <span className="text-white">Amount Due</span>
                  <span className="text-amber-400 font-mono text-base">{formatCurrency(payment.amount)}</span>
                </div>
              </div>

              {/* Mock Card Preview */}
              <div className="bg-gradient-to-br from-surface-50 to-surface-100 p-4 rounded-xl border border-surface-border text-xs space-y-2">
                <div className="flex justify-between items-center text-gray-400">
                  <span className="font-mono uppercase text-[10px]">Visa •••• 4242</span>
                  <CreditCard className="w-4 h-4 text-amber-400" />
                </div>
                <p className="font-mono text-sm text-gray-200">•••• •••• •••• 4242</p>
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>Expires: 12/28</span>
                  <span>Secured by Stripe</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={() => setIsPayModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handlePayNow}
                  isLoading={isProcessing}
                  className="font-bold"
                >
                  Confirm & Pay {formatCurrency(payment.amount)}
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
