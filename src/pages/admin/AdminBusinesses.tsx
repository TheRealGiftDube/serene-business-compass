
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Upload, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const AdminBusinesses = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isCsvDialogOpen, setIsCsvDialogOpen] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddBusiness = () => {
    setIsAddDialogOpen(false);
    toast.success("Business creation feature will be implemented soon");
  };

  const handleCsvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if current user can upload CSV
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        toast.error("You must be logged in to upload CSV files");
        return;
      }

      const { data: canUpload, error: checkError } = await supabase.rpc(
        'check_user_plan_access',
        { 
          _user_id: userData.user.id,
          _permission: 'upload_csv'
        }
      );

      if (checkError) {
        throw checkError;
      }

      if (!canUpload) {
        toast.error("Your current plan does not allow CSV uploads. Please upgrade your plan.");
        return;
      }

      // CSV parsing logic would go here
      toast.success(`File "${file.name}" accepted. CSV import will be implemented soon.`);
      setIsCsvDialogOpen(false);
    } catch (error: any) {
      console.error("Error checking plan permissions:", error);
      toast.error(`Error: ${error.message || "Failed to check plan permissions"}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Businesses</h1>
        <div className="flex gap-4">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Business
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Business</DialogTitle>
                <DialogDescription>
                  Create a new business listing with all details.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Form fields would go here */}
                <p>Business form will be implemented soon.</p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddBusiness}>Save Business</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isCsvDialogOpen} onOpenChange={setIsCsvDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Bulk Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload CSV File</DialogTitle>
                <DialogDescription>
                  Upload a CSV file with business records. The file should include columns for: Business Name, Branch, Contact Number, etc.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <Input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    id="csv-upload"
                    onChange={handleCsvUpload}
                  />
                  <label
                    htmlFor="csv-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm font-medium">
                      Click to upload CSV file
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      Max file size: 5MB
                    </span>
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCsvDialogOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Businesses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search businesses..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {businesses.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No businesses found. Add your first business using the button above.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {businesses.map((business: any) => (
                  <TableRow key={business.id}>
                    <TableCell>{business.name}</TableCell>
                    <TableCell>{business.owner_email}</TableCell>
                    <TableCell>{business.contact_number}</TableCell>
                    <TableCell>
                      {business.is_verified ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBusinesses;
